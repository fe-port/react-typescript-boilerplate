import webpack from 'webpack'

export default class CustomWebpackPlugin {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.done.tapAsync(
      'CustomWebpackPlugin',
      async (params, callback) => {
        await callback()
      }
    )
  }
}
