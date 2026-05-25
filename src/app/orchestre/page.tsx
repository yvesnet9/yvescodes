'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useNegotiationSSE } from '@/hooks/useNegotiationSSE'
import { STATUS_LABEL, type NegotiationStatus, type NegotiationTask } from '@/types/negotiation'

const STATUS_COLOR: Record<NegotiationStatus, string> = {
  pending:   'text-zinc-400',
  started:   'text-blue-400',
  running:   'text-amber-400',
  success:   'text-emerald-400',
  failed:    'text-red-400',
  cancelled: 'text-zinc-500',
}

const STATUS_DOT: Record<NegotiationStatus, string> = {
  pending:   'bg-zinc-500',
  started:   'bg-blue-500 animate-pulse',
  running:   'bg-amber-500 animate-pulse',
  success:   'bg-emerald-500',
  failed:    'bg-red-500',
  cancelled: 'bg-zinc-600',
}

export default function NegotiationTrackPage() {
  const params  = useParams()
  const router  = useRouter()
  const taskId  = params.taskId as string
  const supabase = createClientComponentClient()

  const [token,  setToken]  = useState<string | null>(null)
  const [task,   setTask]   = useState<NegotiationTask | null>(null)
  const [loading, setLoading] = useState(true)

  // Récupérer le token de session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setToken(session?.access_token ?? null)
    })
  }, [supabase])

  // Charger le statut initial depuis l'API
  useEffect(() => {
    if (!token) return
    fetch(`/api/negotiate?task_id=${taskId}`)
      .then(r => r.json())
      .then(data => { setTask(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [taskId, token])

  // SSE — logs en temps réel
  const { logs, status: liveStatus, error: sseError, cancel } = useNegotiationSSE(taskId, token)

  // Mettre à jour le statut affiché avec la dernière info SSE
  const currentStatus = liveStatus ?? task?.status ?? 'pending'
  const isFinal = ['success', 'failed', 'cancelled'].includes(currentStatus)

  async function handleCancel() {
    await fetch(`/api/negotiate?task_id=${taskId}`, { method: 'DELETE' })
    cancel()
    router.push('/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-emerald-500 rounded-full animate-spin"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-xs text-zinc-500 hover:text-zinc-300 mb-3 flex items-center gap-1"
            >
              ← Tableau de bord
            </button>
            <h1 className="text-lg font-semibold text-zinc-100">
              Négociation — {task?.provider ?? '…'}
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5 font-mono">{taskId}</p>
          </div>

          {/* Badge statut */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full
                          bg-zinc-900 border border-zinc-800 text-sm font-medium
                          ${STATUS_COLOR[currentStatus]}`}>
            <span className={`w-2 h-2 rounded-full ${STATUS_DOT[currentStatus]}`}/>
            {STATUS_LABEL[currentStatus]}
          </div>
        </div>

        {/* Résultat si succès */}
        {currentStatus === 'success' && task?.savings_found && (
          <div className="rounded-2xl border border-emerald-800 bg-emerald-950/40 p-5">
            <p className="text-xs text-emerald-500 font-medium mb-1 uppercase tracking-wider">
              Économies obtenues
            </p>
            <p className="text-4xl font-bold text-emerald-400">
              {task.savings_found.toFixed(2)} €
              <span className="text-lg font-normal text-emerald-600 ml-1">/mois</span>
            </p>
            {task.result_summary && (
              <p className="text-sm text-emerald-300/70 mt-3">{task.result_summary}</p>
            )}
            <p className="text-xs text-emerald-700 mt-4">
              Résultat soumis à votre validation — aucune modification sans votre accord.
            </p>
          </div>
        )}

        {/* Erreur SSE */}
        {sseError && (
          <div className="rounded-xl border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-400">
            {sseError}
          </div>
        )}

        {/* Terminal de logs */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-950">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"/>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70"/>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"/>
            <span className="text-xs text-zinc-500 ml-2 font-mono">agent.log</span>
          </div>

          <div className="p-4 font-mono text-xs text-zinc-300 space-y-1.5
                          min-h-[200px] max-h-[380px] overflow-y-auto">
            {logs.length === 0 && !isFinal && (
              <p className="text-zinc-600 animate-pulse">En attente des premiers événements…</p>
            )}
            {logs.map((line, i) => (
              <p key={i} className="leading-relaxed">
                <span className="text-zinc-600">{line.slice(0, 11)}</span>
                <span className="text-emerald-400 ml-1">›</span>
                <span className="ml-1">{line.slice(12)}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {!isFinal && (
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-600
                         text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Annuler
            </button>
          )}
          {isFinal && (
            <button
              onClick={() => router.push('/dashboard')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500
                         text-sm text-white font-medium transition-colors"
            >
              Retour au tableau de bord
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
