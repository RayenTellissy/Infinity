import React from 'react';
import * as Slider from "@radix-ui/react-slider"

// styles
import "./VolumeSlider.css"

type VolumeSliderProps = {
  volume: number
  changeVolume: (volume: number) => void
}

const VolumeSlider = ({ volume, changeVolume }: VolumeSliderProps) => {

  return (
    <Slider.Root
      value={[volume]}
      onValueChange={(volume) => changeVolume(volume[0])}
      className="SliderRoot video-player-volume-slider"
      max={1}
      step={0.03}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  );
};

export default VolumeSlider;