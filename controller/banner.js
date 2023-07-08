import banner from "../models/banner.js";

const saveBanner = async (req, res) => {
    try {

        if (req.body) {
            let result = await banner.create(req.body)
            if (result) {
                return res.status(200).json({ success: true, message: 'saved success' })
            }
        }


        return res.status(400).json({ success: false, message: 'invalid input' })
    } catch (error) {
        return res.status(400).json({ success: false, message: 'invalid input' })
    }
}

export { saveBanner }
