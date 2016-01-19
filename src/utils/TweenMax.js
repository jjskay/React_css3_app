import env from './env';
if (env.CLIENT) {
    require('../lib/TweenMax/uncompressed/TweenMax');
    require('../lib/TweenMax/uncompressed/plugins/DrawSVGPlugin');
}
