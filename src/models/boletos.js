/*
    customerId
    quantity
    purchaseDate
    total
    paymentStatus
    transactionId
*/

import mongoose, { Schema, model } from "mongoose";

const clientes = new Schema({

    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "clientes"
    },
    quantity:{type: Number},
    purchaseDate:{type: Date},
    total:{type: Number},
    paymentStatus:{type: Boolean},
    transactionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaccion"
    },
},{
    timestamps: true,
    strict: false
})

export default model("clientes", clientes)