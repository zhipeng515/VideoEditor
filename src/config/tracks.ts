import {
  getResourcesType,
  getResourcesFormat
} from '~/common/utils/getResourcesInfo'
import { TrackType } from '~/types/tracks'
import { getOffsetX } from '~/common/utils/getTrackElInfo'
import { frameCountToPixel } from '~/common/utils/drawTimeLine'

class BaseTrackItem {
  id: number
  type: TrackType
  name: string
  start: number
  end: number
  frameCount: number
  offsetL: number
  offsetR: number
  format: string
  source: string

  constructor(file: File, event: DragEvent, scale: number) {
    this.id = event.timeStamp
    this.type = getResourcesType(file) as TrackType
    this.name = file.name
    this.frameCount = 1000
    this.start = getOffsetX(event)
    this.end = this.start + frameCountToPixel(scale, this.frameCount)
    this.offsetL = 0
    this.offsetR = 0
    this.format = getResourcesFormat(file)
    this.source = ''
  }

  setStart(event: DragEvent, scale: number) {
    this.start = getOffsetX(event)
    this.end = this.start + frameCountToPixel(scale, this.frameCount)
  }
}

class VideoTrackItem extends BaseTrackItem {
  time: number
  cover: string
  width: number
  height: number
  fps: number

  constructor(file: File, event: DragEvent, scale: number) {
    super(file, event, scale)
    this.time = 0
    this.cover = ''
    this.width = 100
    this.height = 100
    this.fps = 60
  }
}
class AudioTrackItem extends BaseTrackItem {
  time: number
  cover: string

  constructor(file: File, event: DragEvent, scale: number) {
    super(file, event, scale)
    this.time = 0
    this.cover = ''
  }
}
class TextTrackItem extends BaseTrackItem {
  templateId: number

  constructor(file: File, event: DragEvent, scale: number) {
    super(file, event, scale)
    this.templateId = 0
  }
}
class ImageTrackItem extends BaseTrackItem {
  cover: string
  width: number
  height: number
  sourceFrame: number

  constructor(file: File, event: DragEvent, scale: number) {
    super(file, event, scale)
    this.cover = ''
    this.width = 100
    this.height = 100
    this.sourceFrame = 0
  }
}
// 指定轨道
const trackOrder: { [K in TrackType]: 0 | 1 | 2 } = {
  image: 0,
  text: 0,
  video: 1,
  audio: 2
}

const trackHeight: { [K in TrackType]: string } = {
  image: '1.5rem',
  text: '1.5rem',
  video: '4rem',
  audio: '3rem'
}

const trackLeftStart = 10

export {
  VideoTrackItem,
  AudioTrackItem,
  TextTrackItem,
  ImageTrackItem,
  trackOrder,
  trackHeight,
  trackLeftStart
}
