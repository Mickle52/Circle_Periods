import React, { FC, useEffect } from 'react'
import './select-circle.css'
import gsap from 'gsap'
import { TweenLite } from 'gsap'
import { TimelineItem } from '../../types'
import ChangePeriodButtons from './ChangePeriodButtons/ChangePeriodButtons'

const rotate = (event: React.MouseEvent<HTMLButtonElement>) => {
  const targetId = event.currentTarget.id;
  const isRotated = gsap.getProperty('.circle-container', 'transform').toString().includes("45")
  const gsapRotation = (deg: number) => {
    gsap.to('.circle-container', { rotation: deg, duration: 1, });
    gsap.to('.circle-item', { rotation: -deg, duration: 1, });
  }

  if (targetId.includes("1")) {
    if (isRotated) {
      gsap.to('.circle-container', { rotation: 45, duration: 1, });
    }
    gsapRotation(0)
  }
  if (targetId.includes("2")) {
    gsapRotation(-45)
  }
  if (targetId.includes("3")) {
    gsapRotation(-90)
  }
  if (targetId.includes("4")) {
    gsapRotation(-180)
  }
  if (targetId.includes("5")) {
    gsapRotation(135)
  }
  if (targetId.includes("6")) {
    gsapRotation(90)
  }
}

type Props = {
  data: TimelineItem[]
  selectedPeriod: number
  setSelectedPeriod: (period: number) => void
}

const SelectCircle: FC<Props> = ({ data, selectedPeriod, setSelectedPeriod }) => {

  const animateNumber = (e: React.MouseEvent<HTMLButtonElement>, data: TimelineItem[]) => {
    const elementId = Number(e.currentTarget.id.split('').pop());
    let ContFrom = { val: Number(data[selectedPeriod - 1].dateFrom.slice(0, 4)) }
    let NewValFrom = Number(data.find(el => el.id === elementId)?.dateFrom.slice(0, 4))
    if (ContFrom.val !== NewValFrom) {
      ContFrom.val = NewValFrom
    }
    TweenLite.to(ContFrom, 1, {
      val: NewValFrom,
      roundProps: "val",
      onUpdate: function () {
        const counterEl = document.getElementById("circle-date-from");
        if (counterEl) counterEl.innerHTML = String(ContFrom.val);
      }
    });

    let ContTo = { val: Number(data[selectedPeriod - 1].dateTo.slice(0, 4)) }
    let NewValTo = Number(data.find(el => el.id === elementId)?.dateTo.slice(0, 4))
    if (ContTo.val !== NewValTo) {
      ContTo.val = NewValTo
    }
    TweenLite.to(ContTo, 1, {
      val: NewValTo,
      roundProps: "val",
      onUpdate: function () {
        const counterEl = document.getElementById("circle-date-to");
        if (counterEl) counterEl.innerHTML = String(ContTo.val);
      }
    });
  }

  useEffect(() => {
    const circleItems = document.querySelectorAll(".circle-item")
    if (Array.from(circleItems).some(item => item.id.includes(`${selectedPeriod}`))) {
      const target = document.querySelector(`#button-${selectedPeriod}`)
      target?.classList.add("active")
    }
  }, [selectedPeriod])

  useEffect(() => {
    const circleItems = document.querySelectorAll(".circle-item")
    const changeButtons = document.querySelectorAll(".change-period-button")
    circleItems.forEach(item => {
      item.addEventListener("click", (e: Event) => {
        const prevActive = document.querySelector(".active");
        if (prevActive && prevActive.id !== (e.target as HTMLElement).id) {
          prevActive.classList.remove("active");
        }
      })
    })
    changeButtons.forEach(item => {
      item.addEventListener("click", (e) => {
        const prevActive = document.querySelector(".active");
        if (prevActive) {
          prevActive.classList.remove("active");
        }
      })
    })
  }, [])

  const handleChangePeriod = (e: React.MouseEvent<HTMLButtonElement>, el: TimelineItem) => {
    animateNumber(e, data); rotate(e); setSelectedPeriod(el.id);
  }

  const changePeriodButtons = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = Number(e.currentTarget.id.split("-").pop())

    if (e.currentTarget.id.includes("prev") && targetId > 0) {
      setSelectedPeriod(selectedPeriod - 1);
      rotate(e); animateNumber(e, data)
    }
    if (e.currentTarget.id.includes("next") && targetId <= data.length) {
      setSelectedPeriod(selectedPeriod + 1);
      rotate(e); animateNumber(e, data)
    }
  }

  return (
    <section className="select-circle">
      <div className="circle-container">
        {data.map(el => {
          return (
            <button className="circle-item" id={`button-${el.id}`} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleChangePeriod(e, el)} key={el.id}>{el.id}</button>
          )
        })}
      </div>
      <div className="circle-date-container">
        <div className="circle-date from" id="circle-date-from" >{data.find(el => el.id === selectedPeriod)?.dateFrom.slice(0, 4)}</div>
        <div className="circle-date to" id="circle-date-to" >{data.find(el => el.id === selectedPeriod)?.dateTo.slice(0, 4)}</div>
      </div>
      <div className="change-period-buttons">
        <div className='change-period-buttons-info'>{`0${selectedPeriod}/0${data.length}`}</div>
        <div className="change-period-button-container">
          <button id={`prev-period-button-${selectedPeriod - 1}`} className="change-period-button prev" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { changePeriodButtons(e); }} disabled={selectedPeriod === 1}>
          </button>
          <button id={`next-period-button-${selectedPeriod + 1}`} className="change-period-button next" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { changePeriodButtons(e); }} disabled={selectedPeriod === 6}>
          </button>
        </div>
      </div>
    </section >
  )
}

export default SelectCircle