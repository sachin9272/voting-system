import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["voter", "candidate", "admin"],
      default: "voter",
    },

    // Voter verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Aadhar card images (front and back)
    aadharFront: {
      type: String, // file path after upload
      default: "",
    },

    aadharBack: {
      type: String,
      default: "",
    },

    // Track if this voter has voted in which elections
    votedElections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election",
      },
    ],

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// 🔐 Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 🔑 Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
