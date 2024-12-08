type DrawingOptions = {
  lineWidth?: number
  strokeStyle?: string
  canvasWidth?: number
  canvasHeight?: number
}

class CanvasDrawing {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null
  private isDrawing: boolean
  private options: DrawingOptions

  constructor(canvas: HTMLCanvasElement, options?: DrawingOptions) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.isDrawing = false

    // Default options
    this.options = {
      lineWidth: 2,
      strokeStyle: "#000",
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      ...options,
    }

    this.initCanvas()
    this.addEventListeners()
  }

  private initCanvas() {
    if (!this.ctx) throw new Error("CanvasRenderingContext2D is not supported")
    const { lineWidth, strokeStyle, canvasWidth, canvasHeight } = this.options

    // Set initial canvas dimensions and styles
    this.canvas.width = canvasWidth!
    this.canvas.height = canvasHeight!
    this.ctx.lineWidth = lineWidth!
    this.ctx.strokeStyle = strokeStyle!
    this.ctx.lineJoin = "round"
    this.ctx.lineCap = "round"
  }

  private addEventListeners() {
    this.canvas.addEventListener("mousedown", this.startDrawing)
    this.canvas.addEventListener("mousemove", this.draw)
    this.canvas.addEventListener("mouseup", this.stopDrawing)
    this.canvas.addEventListener("mouseleave", this.stopDrawing)
  }

  private startDrawing = (event: MouseEvent) => {
    if (!this.ctx) return
    this.isDrawing = true
    this.ctx.beginPath()
    const { offsetX, offsetY } = event
    this.ctx.moveTo(offsetX, offsetY)
  }

  private draw = (event: MouseEvent) => {
    if (!this.isDrawing || !this.ctx) return
    const { offsetX, offsetY } = event
    this.ctx.lineTo(offsetX, offsetY)
    this.ctx.stroke()
  }

  private stopDrawing = () => {
    if (!this.ctx) return
    this.isDrawing = false
    this.ctx.closePath()
  }

  public clearCanvas() {
    if (!this.ctx) return
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  public setOptions(options: DrawingOptions) {
    this.options = { ...this.options, ...options }

    // Apply updated options to the canvas context
    if (this.ctx) {
      if (options.lineWidth !== undefined)
        this.ctx.lineWidth = options.lineWidth
      if (options.strokeStyle !== undefined)
        this.ctx.strokeStyle = options.strokeStyle
    }
  }
  public getOptions() {
    console.log("this.options", this.options)

    return this.options
  }
  public destroy() {
    // Remove event listeners to clean up
    this.canvas.removeEventListener("mousedown", this.startDrawing)
    this.canvas.removeEventListener("mousemove", this.draw)
    this.canvas.removeEventListener("mouseup", this.stopDrawing)
    this.canvas.removeEventListener("mouseleave", this.stopDrawing)
  }
}

export default CanvasDrawing
