import type { VirtualTypeScriptEnvironment } from '@typescript/vfs'

declare global {
  interface Window {
    tsEnv: VirtualTypeScriptEnvironment
  }

  type SerializedNode = Record<
    string,
    number | string | boolean | SerializedNode[]
  >
}
