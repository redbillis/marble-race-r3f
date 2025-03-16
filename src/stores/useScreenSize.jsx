import { create } from "zustand";

export default create((set) => ({
    width: window.innerWidth,
    height: window.innerHeight,
}));
