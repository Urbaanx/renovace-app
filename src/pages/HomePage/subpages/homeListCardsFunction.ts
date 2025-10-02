export default function homeListCards(id: string,  operation: string, ownerId?: string | null, isOwner?: boolean, name?: string, creationDate?: string,  type?: string,  modelGenerated?: boolean, modelError?: any) {
    
    //localStorage.removeItem("lastCards");
    const lastCards = JSON.parse(
        localStorage.getItem("lastCards") || "[]"
    );
    const isInLastCards = lastCards.find(
        (card: { id: string }) => card.id === id
    );

    

    if (!ownerId || !isOwner) return;

    const filteredLastCards = lastCards.filter((card: { ownerId: string }) => card.ownerId === ownerId);

    if (operation === "add"){
    if (!isInLastCards && filteredLastCards.length < 16) {
        localStorage.setItem(
            "lastCards",
            JSON.stringify([
                ...lastCards,
                {
                    id: id,
                    name: name,
                    creationDate: creationDate,
                    type: type,
                    ownerId: ownerId,
                    modelGenerated: modelGenerated,
                    error: modelError
                },
            ])
        );
    } else if (filteredLastCards.length === 16 && !isInLastCards) {
        const lastCardId = filteredLastCards[0].id;
        const newLastCards = filteredLastCards.filter(
            (card: { id: string }) => card.id !== lastCardId
        );
        localStorage.setItem(
            "lastCards",
            JSON.stringify([
                ...newLastCards,
                {
                    id: id,
                    name: name,
                    creationDate: creationDate,
                    type: type,
                    ownerId: ownerId,
                    modelGenerated: modelGenerated,
                    error: modelError
                },
            ])
        );
    } else  {
        const newLastCards = filteredLastCards.filter(
            (card: { id: string }) => card.id !== id
        );
        localStorage.setItem(
            "lastCards",
            JSON.stringify([
                ...newLastCards,
                {
                    id: id,
                    name: name,
                    creationDate: creationDate,
                    type: type,
                    ownerId: ownerId,
                    modelGenerated: modelGenerated,
                    error: modelError
                },
            ])
        );
    }
} else if (operation === "remove"){
    if (isInLastCards){
        const newLastCards = lastCards.filter((card: {id:string}) => card.id !== id)
        localStorage.setItem(
            "lastCards",
            JSON.stringify([...newLastCards])
        )
    }
    }
}