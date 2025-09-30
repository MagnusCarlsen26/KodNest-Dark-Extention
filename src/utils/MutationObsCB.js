// Dark theme function is passed as parameter.
// The Dark theme function should return a boolean.
export default function MutationObsCB( fn, args ) {

    console.log("MutationObsCB", fn.name);

    if ( !fn(args) ) {
        const observer = new MutationObserver((_, obs) => {

            if ( fn(args) ) obs.disconnect();

        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

}