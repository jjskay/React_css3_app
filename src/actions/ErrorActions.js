var ErrorActions = {};
ErrorActions.ErrorOccurred = function (context, payload, done) {
    context.dispatch('ERROR_OCCURRED', payload.error);
    done();
};
export default  ErrorActions;