export default function Counter(props) {
    useEffect(() => {
        document.title = `Count: ${props.count}`;
    }, [props.count]);

    return createElement(
        "div",
        null,
        `Count: ${props.count}`,
        createElement(
            "button",
            { onClick: () => props.setCount(props.count + 1) },
            "Increase"
        )
    );
}
