import  multer from 'multer';

// set storage
var storage = multer.diskStorage({
    destination : function ( req , file , cb ){
        cb(null, 'public')
    },
    filename : function (req, file , cb){
        // image.jpg
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

        const fieldName = file.fieldname.includes('bannerSlider') ? 'bannerSlider' : file.fieldname;

        cb(null, fieldName + '-' + Date.now() + ext)
    }
})

export default multer({ storage: storage })
