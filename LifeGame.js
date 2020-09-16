class LifeGame {
    constructor (rows, columns) {
        this.rows = rows
        this.columns = columns
        this.generationNumber = 0

        this.map = []
        for (let y = 0; y < this.rows; y++) {
            const row = []

            for (let x = 0; x < this.columns; x++) {
                row.push(false)
            }

            this.map.push(row)
        }
    }

    changeGeneration () {
        const map = []

        for (let y = 0; y < this.rows; y++) {
            const row = []
            
            for (let x = 0; x < this.columns; x++) {
                let neighborsNumber = 0
                let state = false
                
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) {
                            continue
                        }
                        
                        neighborsNumber += this.getField(x + dx, y + dy)
                    }
                }

                if (this.getField(x, y) === true) {
                    if (neighborsNumber === 2 || neighborsNumber === 3) {
                        state = true
                    }
                }

                else {
                    if (neighborsNumber === 3) {
                        state = true
                    }
                }

                row.push(state)
            }

            map.push(row)
        }

        this.map = map
        this.generationNumber++
    }

    reviveRandomFields (n = 1) {
        const freeFields = []

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                if (this.getField(x, y) === false) {
                    freeFields.push({ x, y })
                }
            }
        }

        n = parseInt(n)
        n = Math.min(n, freeFields.length)

        while (n-- > 0) {
            const index = Math.floor(Math.random() * freeFields.length)
            const { x, y } = freeFields.splice(index, 1)[0]
            this.setField(x, y, true)
        }
    }

    forFreeEach (hander) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                if (this.getField(x, y) === true) {
                    hander(x, y)
                }
            }
        }
    }

    getField (x, y) {
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
            return false
        }

        return this.map[y][x]
    }

    setField (x, y, value) {
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
            return value
        }

        return this.map[y][x] = value
    }
}