import MutationObsCB from "./MutationObsCB.js";

export default function applyMutationObsToPage(
    components,
) {

    if (typeof components === "function") components = [components]

    components.forEach( component => {

        const output = component()

        if ( typeof output === "boolean" ) {
            if ( !output ) MutationObsCB( component )
        } 

        else if ( typeof output === "object" ) output.forEach( MutationObsCB )
        else throw new Error( `applyMutationObsToPage: Invalid output type: ${typeof output} from ${component.name}` )

    })

}