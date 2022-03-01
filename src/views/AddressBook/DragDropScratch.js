import { Fragment, useState } from "react"


const DragDropScratch = () => {

    const [isInside, setIsInside] = useState(false)

    const changeHandler = (e) => {
        const upload = e.target.files[0]
        if (upload.type === "application/json") {
            const fileReader = new FileReader()
            fileReader.readAsText(e.target.files[0], "UTF-8")
            fileReader.onload = e => {
                console.log(e.target.result)
            }
        } else {
            console.log('wrong format')
        }
    }

    const handleDragOver = (e) => {
        e.dataTransfer.dropEffect = 'copy'
    }

    return (
        <Fragment>
            <div
                className={isInside ? "drag-drop_border_drag text-center" : "drag-drop_border text-center"}
                onDrop={e => changeHandler(e)}
                onDragOver={(e) => handleDragOver(e)}
                onDragEnter={() => setIsInside(true)}
                onDragLeave={() => setIsInside(false)}
            >
                Drag & Drop
            </div>
        </Fragment>
    )
}

export default DragDropScratch