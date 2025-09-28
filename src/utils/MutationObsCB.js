// Dark theme function is passed as parameter.
// The Dark theme function should return a boolean.
export default function MutationObserverCB( fn ) {

    console.log("MutationObserverCB", fn.name);

    if ( !fn() ) {
        const observer = new MutationObserver((_, obs) => {

            if ( fn() ) obs.disconnect();

        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

}