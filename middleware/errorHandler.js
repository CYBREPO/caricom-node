import constants from '../constant/constant.js';

const errorHandler = (err, req, res, next) => {
    const errStatus = res.statusCode ?? 500;

    switch (errStatus) {
        case constants.FORBIDDEN:
            res.json({ success: false, title: "FORBIDDEN", message: err.message, stackTrace: err.stackTrace });
            break;
        case constants.UNAUTHORIZED:
            res.json({ success: false, title: "UNAUTHORIZED", message: err.message, stackTrace: err.stackTrace });
            break;
        case constants.NOT_FOUND:
            res.json({ success: false, title: "NOT FOUND", message: err.message, stackTrace: err.stackTrace });
            break;
        case constants.SERVER_ERROR:
            res.json({ success: false, title: "SERVER ERROR", message: err.message, stackTrace: err.stackTrace });
            break;
        default: 
            break

    }
}

exports.errorHandler = errorHandler