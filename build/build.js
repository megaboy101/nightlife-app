/*eslint-disable no-console*/
import webpack from 'webpack';
import config from '../webpack.config.prod.js';

process.env.NODE_ENV = 'production';

console.log('Starting production build process, this may take a while...');

webpack(config).run((err, stats) => {
    if (err) {
        console.error(err);
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        console.error('Compiling error!');
        return 1;
    }

    if (jsonStats.hasWarnings) {
        console.log('Loading with warnings.');
    }

    console.log('Webpack stats: ' + stats);

    console.log('Successfully compiled!');

    return 0;
});