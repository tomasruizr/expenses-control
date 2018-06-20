import dev from './webpack.config.dev';
// exclude NPM deps from test bundle
dev.externals = [require( 'webpack-node-externals' )()];
// Add ENV_NODE test
dev.optimization = dev.optimization || {};
dev.optimization['nodeEnv'] = 'test';
dev.target = 'node';
dev.module.rules.forEach(( rule ) => {
  if ( rule.test.toString() === '/\\.vue$/' ) {
    rule.options.optimizeSSR = false;
  }
});
// use inline source map so that it works with mocha-webpack
dev.devtool = 'inline-source-map';
dev.output.devtoolModuleFilenameTemplate = '[absolute-resource-path]';
dev.output.devtoolFallbackModuleFilenameTemplate = '[absolute-resource-path]?[hash]';
export default dev;
