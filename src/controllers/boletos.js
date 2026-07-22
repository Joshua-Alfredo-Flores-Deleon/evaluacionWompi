    import model from "../models/boletos.js"
    
    const boletosController = {};

    boletosController.getAll = async (req, res) => {
        try {
            const boletos = await model.find()
            return res.status(200).json(boletos)
        } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message:"Internal Server Error"})
        }
    }

    boletosController.insert = async (req, res) => {
        try {
            const{
                    customerId,
                    quantity,
                    purchaseDate,
                    total,
                    paymentStatus,
                    transactionId
            } = req.body;

            const nuevo = new model({
                    customerId,
                    quantity,
                    purchaseDate,
                    total,
                    paymentStatus,
                    transactionId
            })

            await nuevo.save();

            return res.status(200).json({message:"Saved"})

        } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message:"Internal Server Error"})
        }
    }

        boletosController.update = async (req, res) => {
        try {

            const {
                customerId,
                    quantity,
                    purchaseDate,
                    total,
                    paymentStatus,
                    transactionId
            } = req.body;

            const boletosFound = await model.findById(req.params.id);

            const updatedData = {
                customerId,
                    quantity,
                    purchaseDate,
                    total,
                    paymentStatus,
                    transactionId
            }

            await model .findByIdAndUpdate(
                req.params.id,
                updatedData,
                {new:true}
            )

            return res.status(200).json({message:"Boletos Updated"})
            
        } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message:"Internal Server Error"})
        }
    }


        boletosController.delete = async (req, res) => {
        try {

            const boletosFound = await model.findById(req.params.id)

            const boletosDeleted = await model.findByIdAndDelete(req.params.id)

            if(!boletosDeleted){
                return res.status(404).json({message:"Not found"})
            }

            return res.status(200).json({message:"deleted"})
            
        } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message:"Internal Server Error"})
        }
    }

    export default boletosController;