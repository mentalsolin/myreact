export default function Header() {
    const [name, setName] = useState("bbb");

    function handleClick() {
        name === "bbb" ? setName("aaa") : setName("bbb");
    }

    return createElement(
        "div",
        { id: "second", class: "item" },
        createElement("div", null, "hello, ", name),
        createElement("button", { onClick: handleClick }, "click me")
    );
}
