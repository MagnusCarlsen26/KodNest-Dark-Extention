export default function kodNestLogo() {
const logoImg = document.querySelector("#header-logo");

    if (logoImg) {
    const logoWrapper = document.createElement("div");
    logoWrapper.id = "header-logo";
    logoWrapper.innerHTML = `
        <span class="k-logo">K</span><span class="brand-text">odNest</span>
    `;
    logoImg.replaceWith(logoWrapper);

    // Inject styles for the text logo
    const style = document.createElement("style");
    style.textContent = `
        #header-logo {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 700;
            font-size: 26px; /* overall font size */
            letter-spacing: -1px; /* tighter spacing */
            display: flex;
            align-items: center;
        }

        #header-logo .k-logo {
        color: #c99b2f; /* golden K */
            font-size: 30px;
            font-weight: 900;
            position: relative;
            margin-right: 2px;
        }

        /* Pencil-like effect for the "K" */
        #header-logo .k-logo::before {
            content: "";
            position: absolute;
            left: -5px;
            top: 3px;
            width: 3px;
            height: 70%;
            background: #c99b2f;
            border-radius: 2px;
        }
        #header-logo .k-logo::after {
            content: "";
            position: absolute;
            left: -5px;
            bottom: -4px;
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 7px solid #c99b2f;
        }

        #header-logo .brand-text {
            color: #fff;
            margin-right: 90px;
            font-weight: 700;
        }
        
        .k-logo {
            margin-right: 90px;
        }
    `;
    document.head.appendChild(style);
    }
}