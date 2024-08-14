
const getNameLetter = (name) => {
    const namearr = name.split(" ");
    const letter = namearr.map((word) => word[0]).join("");
    return letter;
};

export default getNameLetter;
