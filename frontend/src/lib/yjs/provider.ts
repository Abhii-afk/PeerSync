import type { SupabaseClient, RealtimeChannel } from "@supabase/supabase-js"
import * as Y from "yjs"

export function createSupabaseYjsProvider(doc: Y.Doc, channelName: string, supabase: SupabaseClient): RealtimeChannel {
  const channel = supabase.channel(channelName)

  channel.on("broadcast", { event: "yjs-update" }, ({ payload }) => {
    if (payload?.update) {
      Y.applyUpdate(doc, new Uint8Array(payload.update as number[]))
    }
  })

  channel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      const stateVector = Y.encodeStateVector(doc)
      const update = Y.encodeStateAsUpdate(doc, stateVector)
      await channel.send({ type: "broadcast", event: "yjs-update", payload: { update: Array.from(update) } })
    }
  })

  doc.on("update", async (update) => {
    await channel.send({ type: "broadcast", event: "yjs-update", payload: { update: Array.from(update) } })
  })

  return channel
}
