let appComponent;
let appContainer;

// HOOKS

let stateArray = [];
let hookIndex = 0;

function useState(initialValue) {
    if (stateArray[hookIndex] === undefined) {
        stateArray[hookIndex] = initialValue;
    }

    const index = hookIndex;

    function setState(newValue) {
        console.log(stateArray);

        stateArray[index] = newValue;

        console.log(newValue);

        appContainer.innerHTML = "";
        hookIndex = 0;
        render(createElement(appComponent), appContainer);
    }

    hookIndex++;
    effectIndex = 0;
    return [stateArray[index], setState];
}

let effectsArray = [];
let effectIndex = 0;

function useEffect(callback, dependencies) {
    const prevDeps = effectsArray[effectIndex];
    let hasChanged = true;

    if (dependencies !== undefined && prevDeps !== undefined) {
        hasChanged = false;

        if (dependencies.length !== prevDeps.length) {
            hasChanged = true;
        } else {
            for (let i = 0; i < dependencies.length; i++) {
                if (dependencies[i] !== prevDeps[i]) {
                    hasChanged = true;
                    break;
                }
            }
        }
    }

    if (hasChanged) {
        callback();
    }

    effectsArray[effectIndex] = dependencies;
    effectIndex++;
}

// GENERAL

function createElement(type, props, ...children) {
    return {
        type,
        props: props || {},
        children: children.flat(),
    };
}

function render(vdom, container) {
    if (typeof vdom === "string" || typeof vdom === "number") {
        container.appendChild(document.createTextNode(vdom));
        return;
    }

    if (typeof vdom.type === "function") {
        render(vdom.type(vdom.props), container);
        return;
    }

    const element = document.createElement(vdom.type);

    if (vdom.props) {
        Object.keys(vdom.props).forEach((key) => {
            if (key.startsWith("on") === true) {
                element.addEventListener(
                    key.substring(2).toLowerCase(),
                    vdom.props[key]
                );
            } else {
                element.setAttribute(key, vdom.props[key]);
            }
        });
    }

    if (vdom.children) {
        vdom.children.forEach((child) => {
            render(child, element);
        });
    }

    container.appendChild(element);
}
