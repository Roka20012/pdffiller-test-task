let params = {
    lines: [
        {
            background: "#00F",
            updateTime: 1000,
            elements: [
                {
                    background: "blue",
                    width: 35
                },
                {
                    background: "orange",
                    width: 50
                },
                {
                    background: "green",
                    width: 5
                }
            ]
        },
        {
            background: "green",
            updateTime: 2000,
            elements: [
                {
                    background: "red",
                    width: 25
                },
                {
                    background: "blue",
                    width: 50
                },
                {
                    background: "red",
                    width: 10
                }
            ]
        },
        {
            background: "orange",
            updateTime: 3000,
            elements: [
                {
                    background: "yellow",
                    width: 30
                },
                {
                    background: "yellow",
                    width: 25
                }
            ]
        }
    ]
};

const addLines = props => {
    if (!props) throw new Error("Bad props");

    let { lines } = props;
    let pageHeight = document.documentElement.clientHeight;
    let height = pageHeight / props.lines.length;

    lines.forEach((line, i) => {
        document.body.innerHTML += `<div class="line line-${i + 1}" style="width: 100%; 
        height: ${height}px; background-color: ${line.background}; display: flex;"></div>`;
    });

    addElements(lines, height);
};

const changeLinesAndElementsColor = props => {
    if (!props) throw new Error("Bad props");

    let allLines = [...document.querySelectorAll(".line")];

    allLines.forEach((el, i) => {
        setInterval(() => {
            el.style.backgroundColor = generateColor();
        }, props.lines[i].updateTime);

        let lineElements = [
            ...document.querySelectorAll(`.line-${i + 1} > .element`)
        ];

        lineElements.forEach(el => {
            setInterval(() => {
                el.style.backgroundColor = generateColor();
            }, props.lines[i].updateTime);
        });
    });
};

const addElements = (lines, height) => {
    let allLines = [...document.querySelectorAll(".line")];

    lines.forEach((el, i) => {
        el.elements.forEach((element, index) => {
            allLines[i].innerHTML += `<div class="element element-${index}"
            style="width: ${element.width}%; height: ${height}px; 
            background-color: ${element.background};" ></div>`;
        });
    });
};

const generateColor = _ => {
    const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

    let rgb = [getRandomInt(256), getRandomInt(256), getRandomInt(256)]; //0-255
    return `rgb(${rgb.join()})`;
};

addLines(params);
changeLinesAndElementsColor(params);
