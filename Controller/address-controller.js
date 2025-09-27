import Address from "../models/Address.js";


const addAddress = async (req, res) => {
    try {
        const { name, phone, street, state, zipCode, city } = req.body;
        const userID = req._id;
        const role = req.role;
        const userAddresses = await Address.find({ user: userID ,role});
        if(role=="customer"){
        if (userAddresses.length < 3) {
            const newaddress = await Address.create({ user: userID, name, phone, street, state, city, zipCode });
            return res.status(201).json({ success: true, message: "Address saved successfully", newaddress });
        }
        else {
            return res.status(409).json({ success: false, message: "You can save upto 3 addresses only" });
        }
        }
        else{
            if (userAddresses.length == 1 ) {
            const newaddress = await Address.create({ user: userID, name, phone, street, state, city, zipCode });
            return res.status(201).json({ success: true, message: "Address saved successfully", newaddress });
        }
        else {
            return res.status(409).json({ success: false, message: "You can have only 1 addresses" });
        }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `error - ${error}` });
    }
}

const getAddress = async (req, res) => {
    try {
        const _id = req._id;
        const role = req.role;
        const addresses = await Address.find({ user: _id ,role});
        res.status(200).json({ success: true, message: "Address fecth successfull", addresses });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `error - ${error}` });
    }
}

const updateAddress = async (req, res) => {
    try {
        const id = req._id;
        const role = req.role;
        const { addressId } = req.params;
        const { name, phone, street, state, zipCode, city } = req.body;
        const address = await Address.findOne({ _id: addressId, user: id ,role});
        if (!address) {
            return res.status(400).json({ success: false, message: "Please try again" });
        }

        if (name) address.name = name;
        if (phone) address.phone = phone;
        if (street) address.street = street;
        if (state) address.state = state;
        if (zipCode) address.zipCode = zipCode;
        if (city) address.city = city;

        const newaddress = await address.save();

        return res.status(201).json({ success: true, message: "Address saved successfully", newaddress });

    } catch (error) {
        res.status(500).json({ success: false, message: `error - ${error}` });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const {addressId} = req.params;
        const id = req._id;
        const role = req.role;
        const address = await Address.findOne({user:id,_id:addressId,role});
        if(!address){
            return res.status(404).json({ success: false, message: "Address not found" });
        }
        await address.deleteOne();
        res.status(200).json({ success: true, message: "Address Deleted Successfully"});
    } catch (error) {
        res.status(500).json({ success: false, message: `error - ${error}` });
    }
}


export { addAddress, getAddress, updateAddress, deleteAddress };