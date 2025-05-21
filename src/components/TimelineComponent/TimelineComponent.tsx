import SelectCircle from "../SelectCircle/SelectCircle";
import { data } from "../../data";
import './timeline-component.css'
import { FC, useState } from "react";
import SwiperComponent from "../SwiperComponent/SwiperComponent";
import { TimelineItem } from "../../types";

type Props = {
  data: TimelineItem[]
}

const TimelineComponent: FC<Props> = ({ data }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1)
  return (
    <>
      <div className="timeline-container">
        <div className="timeline-container-lines"></div>
        <div className="timeline-title">
          <div className="timeline-title-text">Исторические<br />даты</div>
        </div>
        <SelectCircle data={data} selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
        <SwiperComponent period={selectedPeriod} data={data} />
      </div>
    </>)
};

export default TimelineComponent;
