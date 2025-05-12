import ownerData from "../testdata/frontend/owner.json";
import petData from "../testdata/frontend/pet.json";

export function getUniqueNames() {
    const timestamp = Date.now();
    const uniqueFirstName = `${ownerData.validOwner.firstName}${timestamp}`;
    const uniqueLastName = `${ownerData.validOwner.lastName}${timestamp}`;
    const uniquePetName = `${petData.petDetails.name}${timestamp}`;
    const updatedUniquePetName = `${petData.updatePetName.name}${timestamp}`;


    return {
        ...ownerData.validOwner,
        ...petData.petDetails,
        ...petData.updatePetName,
        firstName: uniqueFirstName,
        lastName: uniqueLastName,
        name: uniquePetName,
        updatedName: updatedUniquePetName
    };
}
