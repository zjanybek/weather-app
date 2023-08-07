import webpack from 'webpack'
import path from 'path'
import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import { BuildEnv, BuildPaths } from './config/build/types/config'

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'main.ts'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  }

  const mode = env.mode || 'development'
  const PORT = env.port || 8080

  const isDev = mode === 'development'

  const config: webpack.Configuration = buildWebpackConfig({
    mode: mode,
    paths,
    isDev,
    port: PORT,
  })

  return config
}