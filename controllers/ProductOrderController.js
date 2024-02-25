const ProductOrder = require('../models/ProductOrder');
const base = require('./baseController');

exports.productOrder = async (req, res, next) => {
    try {
        const xml = req.body;
        await ProductOrder.callSoapService(xml);

        // res.status(200).json({
        //     status: 'success',
        //     data: xml
        // });

        res.header('Content-Type', 'application/xml')
        res.status(200).send(xml)


    } catch (error) {
        next(error);
    }
};