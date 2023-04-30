import mongoose from "mongoose";

const OtSchema = mongoose.Schema({
    ot_number: {
        type: Number,
        required: true,
        trim: true,
    },
    om_number: {
        type: Number,
        trim: true,
    },
    init_Date: {
        type: Date,
        default: Date.now()
    },
    end_Date: {
        type: Date,
        default: Date.now()
    },
    ot_client: {
        type: String,
        trim: true
    },
    ot_Description: {
        type: String,
        trim: true
    },
    value: {
        type: Number,
        trim: true
    },
    solped: {
        type: Number,
        trim: true
    },
    aviso: {
        type: Number,
        trim: true
    },
    oc_number: {
        type: Number,
        trim: true
    },
    oc_Date: {
        type: Date,
        default: Date.now()
    },
    gd_number_client: {
        type: Number,
        trim: true
    },
    gd_Date_client: {
        type: Date,
        default: Date.now()
    },
    gd_number: {
        type: Number,
        trim: true
    },
    gd_Date: {
        type: Date,
        default: Date.now()
    },
    ep_Date : {
        type: Date,
        default: Date.now()
    },
    HES: {
        type: Number,
        trim: true
    },
    HES_Date: {
        type: Date,
        default: Date.now()
    },
    factura_number: {
        type: Number,
        trim: true
    },
    factura_Date: {
        type: Date,
        default: Date.now()
    },
    observaciones: {
        type: String,
        trim: true
    },
    ot_pictures: [
        {
            name: { type: String },
            url: { type: String }
        }
    ],
    ot_state: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const OT = mongoose.model("OT", OtSchema);
export default OT;