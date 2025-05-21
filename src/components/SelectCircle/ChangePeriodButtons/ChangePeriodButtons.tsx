import { FC } from 'react';
import './change-buttons.css'
import { TimelineItem } from '../../../types';
type Props = {
  selectedPeriod: number
  data: TimelineItem[]
  handleChangePeriod: (e: React.MouseEvent<HTMLButtonElement>, el: TimelineItem) => void
}

const ChangePeriodButtons: FC<Props> = ({ selectedPeriod, data, handleChangePeriod }) => {
  return (
    <>
      <div className="change-period-buttons">
        <button id={`${selectedPeriod - 1}`} className="change-period-button" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleChangePeriod(e, data[selectedPeriod - 1])}>
          1
        </button>
        <button id={`${selectedPeriod + 1}`} className="change-period-button" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleChangePeriod(e, data[selectedPeriod + 1])}>
          2
        </button>
      </div>
    </>
  );
};

export default ChangePeriodButtons;
