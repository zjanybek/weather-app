import { ResolveOptions } from 'webpack'
import { BuildOptions } from './types/config'

export function buildResolvers({ paths }: BuildOptions): ResolveOptions {
  return {
    alias: {
      '@': paths.src
    },
    extensions: ['.tsx', '.ts', '.vue', '.js']
  }
}
