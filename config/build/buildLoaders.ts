import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from './types/config'

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader'
      },
      'sass-loader'
    ]
  }

  const vueLoader = {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      esModule: true
    }
  }

  const typescriptLoader = {
    test: /\.ts?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true,
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  }

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff|svg)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name: '[name].[hash:8].[ext]'
        }
      }
    ]
  }

  return [fileLoader, typescriptLoader, vueLoader, cssLoader]
}
