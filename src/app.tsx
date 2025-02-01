import { useEffect, useState } from 'preact/hooks'
import './app.css'
import { Fireworks } from 'fireworks-js';

export function App() {

  const endDate = new Date('02/01/2025 19:55');
  const now = new Date();
  const rest = (endDate.getTime() - now.getTime()) / 1000;
  const [time, setTime] = useState(rest);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        // console.log('endDate.getTime(): ', endDate.getTime());
        // console.log('now.getTime(): ', now.getTime());

        const endDate = new Date('02/01/2025 19:55');
        const now = new Date();
        const rest = (endDate.getTime() - now.getTime()) / 1000;
        console.log(rest);

        if (time <= 0) {
          clearInterval(timer);
          return 0;
        }
        return rest;
        // if (time === 0) {
        //   clearInterval(timer);
        //   return 0;
        // } else return time - 1;
      });
    }, 1000);
  }, []);

  const container = document.querySelector('body');
  useEffect(() => {
    if (!container) {
      return;
    }
    const body = document.querySelector("body");

    function createHeart() {
      const heart = document.createElement("div");
      heart.className = "fas fa-heart";
      heart.style.left = (Math.random() * 100) + "vw";
      heart.style.animationDuration = (Math.random() * 4) + 3 + "s"
      body?.appendChild(heart);
    }
    setInterval(createHeart, 100);
    setInterval(function name(params) {
      var heartArr = document.querySelectorAll(".fa-heart")
      if (heartArr.length > 200) {
        heartArr[0].remove()
      }
      //console.log(heartArr);
    }, 100)
    // fireworks.start();
  }, [container]);


  useEffect(() => {
    if (!container) {
      return;
    }

    const fireworks = new Fireworks(container, {
      autoresize: true,
      opacity: 0.5,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 50,
      traceLength: 3,
      traceSpeed: 10,
      explosion: 5,
      intensity: 30,
      flickering: 50,
      lineStyle: 'round',
      hue: {
        min: 0,
        max: 360
      },
      delay: {
        min: 30,
        max: 60
      },
      rocketsPoint: {
        min: 50,
        max: 50
      },
      lineWidth: {
        explosion: {
          min: 1,
          max: 3
        },
        trace: {
          min: 1,
          max: 2
        }
      },
      brightness: {
        min: 50,
        max: 80
      },
      decay: {
        min: 0.015,
        max: 0.03
      },
      mouse: {
        click: false,
        move: false,
        max: 1
      }
    });
    // fireworks.start();
  }, [container]);

  return (
    <>
      <div style="width: 100vw; height: 100vh; position: absolute; display:flex; justify-content:center; align-items: center">
        <div style="font-size: 5rem">

          <p>
            Time left:
          </p>
          <p>

            {`${Math.floor(time / 60 / 60)}`.padStart(2, '0')}
            :{`${Math.floor((time / 60) % 60)}`.padStart(2, '0')}
            :{`${Math.round(time % 60)}`.padStart(2, '0')}
            {/* {endDate.toISOString()} */}
          </p>
        </div>
      </div>
    </>
  )
}
