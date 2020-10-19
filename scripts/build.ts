import webpack from 'webpack'
import prodConfig from './webpack/webpack.prod'

const compiler = webpack(prodConfig)

compiler.run((error, stats) => {
  if (error) {
    console.error(error)
    return
  }

  const analyzeStatsOpts = {
    colors: true,
    modules: false,
    entrypoints: false,
    warnings: false,
    warningsFilter: [/exceeds the recommended limit/]
  }
  // console.log(stats.toString(ENABLE_ANALYZE ? analyzeStatsOpts : 'minimal'))
  console.log(stats.toString(analyzeStatsOpts))
})
