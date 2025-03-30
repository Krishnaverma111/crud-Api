const usermodel = require("../Model/Usermodel.js");
const { validEmail, validname, validpassword } = require("../AllValidation/Allvalidations.js");
const bcrypt = require("bcrypt");
const { otpsender } = require("../Nodemailer/SendOtp.js");

exports.createuser = async (req, res) => {
    try {
        const data = req.body;
        const { name, emailId, password } = data;
        const randomOtp = Math.floor(1000 + Math.random() * 9000);

        if (!name) return res.status(400).send({ status: false, msg: "Please provide a name" });
        if (!validname(name)) return res.status(400).send({ status: false, msg: "Enter a valid name" });
        if (!emailId) return res.status(400).send({ status: false, msg: "Please provide an email ID" });
        if (!validEmail(emailId)) return res.status(400).send({ status: false, msg: "Please enter a valid email" });
        if (!password) return res.status(400).send({ status: false, msg: "Please provide a password" });
        if (!validpassword(password)) return res.status(400).send({ status: false, msg: "Password is not valid" });

        // Check if email already exists
        const existingUser = await usermodel.findOne({ emailId });
        if (existingUser) {
            return res.status(400).send({ status: false, msg: "Email already registered" });
        }

        // Hashing Password (Uncomment if needed)
        const hashedPassword = await bcrypt.hash(password, 5);
        data.password = hashedPassword;

        data.otp = randomOtp;
        data.role = "user";

        // Creating User in Database
        const userdb = await usermodel.create(data);
        return res.status(201).send({ status: true, msg: "User successfully created", data: userdb });

    } catch (e) {
        return res.status(500).send({ status: false, msg: "Error from server", error: e.message });
    }
};

// Get all users
exports.getall = async (req, res) => {
    try {
        const userdata = await usermodel.find();
        if (!userdata || userdata.length === 0) {
            return res.status(404).json({ status: false, msg: "Data not found" });
        }
        return res.status(200).json({ status: true, data: userdata });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error from server", error: error.message });
    }
};

// Get one user
exports.getone = async (req, res) => {
    try {
        const id = req.params.id;
        const userexist = await usermodel.findById(id);
        if (!userexist) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }
        return res.status(200).json({ status: true, data: userexist });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error from server", error: error.message });
    }
};

// Update user
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const userexist = await usermodel.findById(id);
        if (!userexist) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }

        const updateddata = await usermodel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        return res.status(200).json({ status: true, msg: "User updated successfully", data: updateddata });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error from server", error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userexist = await usermodel.findById(id);
        if (!userexist) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }

        await usermodel.findByIdAndDelete(id);
        return res.status(200).json({ status: true, msg: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Error from server", error: error.message });
    }
};
