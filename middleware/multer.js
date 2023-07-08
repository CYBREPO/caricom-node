import  multer from 'multer';

// set storage
var storage = multer.diskStorage({
    destination : function ( req , file , cb ){
        cb(null, 'public')
    },
    filename : function (req, file , cb){
        // image.jpg
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

export default multer({ storage: storage })
