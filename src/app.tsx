import { useEffect, useState } from 'preact/hooks'
import './app.css'
import { Fireworks } from 'fireworks-js';

export function App() {
  const [acceptMessage, setAcceptMessage] = useState(false);

  const endDate = new Date('02/01/2025 19:55');
  const now = new Date();
  const rest = (endDate.getTime() - now.getTime()) / 1000;
  const [time, setTime] = useState(rest);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        const endDate = new Date('02/01/2025 19:55');
        const now = new Date();
        const rest = (endDate.getTime() - now.getTime()) / 1000;
        console.log(rest);

        if (time <= 0) {
          clearInterval(timer);
          return 0;
        }
        return 0;
        // return rest;
      });
    }, 1000);
  }, []);


  const container = document.querySelector('body');
  useEffect(() => {
    if (!container || acceptMessage) {
      return;
    }

    function createHeart() {
      const heart = document.createElement("div");
      heart.className = "fas fa-heart";
      heart.style.left = (Math.random() * 100) + "vw";
      heart.style.animationDuration = (Math.random() * 4) + 3 + "s"
      container?.appendChild(heart);
    }
    const interval = setInterval(function name() {
      if (!acceptMessage) {
        createHeart();
      }
      var heartArr = document.querySelectorAll(".fa-heart")
      if (heartArr.length > 200) {
        heartArr[0].remove()
      }
    }, 100)


    return () => clearInterval(interval);
  }, [container, acceptMessage]);


  useEffect(() => {
    if (!container) {
      return;
    }


    // fireworks.start();
    if (acceptMessage) {
      setTimeout(() => {

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

        fireworks.start();
      }, 1000)
    }
  }, [container, acceptMessage]);


  function makeNewPosition() {

    // Get viewport dimensions (remove the dimension of the div)
    var h = window.innerHeight - 100;
    var w = window.innerWidth - 100;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];
  }

  return (
    <>
      {
        !acceptMessage ?
          <div style="width: 100vw; max-width:100vw; height: 100vh; max-height: 100vh; position: absolute; display:flex; justify-content:center; align-items: center">

            {/* <div style="background-color: red; border-radius: 1rem; padding: 1rem; display:none;" id="noButton"> */}
            <div style="background-color: red; border-radius: 1rem; padding: 1rem; position:absolute; display:none;" id="noButton">
              <p style="font-size: 3rem" onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();




                const [h, w] = makeNewPosition();
                console.log(h, w);

                const noButton = document.getElementById('noButton') as any;
                noButton.style.top = h + 'px';
                noButton.style.left = w + 'px';
              }}>No</p>
            </div>
            {
              time
                ? <div style="font-size: 3rem">


                  <p>
                    Tiempo restante:
                  </p>
                  <p>

                    {`${Math.floor(time / 60 / 60)}`.padStart(2, '0')}
                    :{`${Math.floor((time / 60) % 60)}`.padStart(2, '0')}
                    :{`${Math.round(time % 60)}`.padStart(2, '0')}
                  </p>
                </div>
                : <div>
                  <p style="font-size: 3rem">
                    ¿Quieres ser mi San Valentin?
                  </p>

                  <div style="display:flex; flex-flow:row; justify-content:space-around; margin-top:1rem;">
                    <div style="background-color: green; border-radius: 1rem; padding: 1rem;">
                      <p style="font-size: 3rem; margin: 0 1rem;" onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        var heartArr = document.querySelectorAll(".fa-heart")
                        if (heartArr.length) {
                          Array.from(heartArr).forEach(h => h.remove())
                        }
                        setAcceptMessage(true);
                      }}>Sí</p>
                    </div>
                    <div style="background-color: red; border-radius: 1rem; padding: 1rem;" id="originalNoButton">
                      <p style="font-size: 3rem" onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        const [h, w] = makeNewPosition();

                        (document.getElementById('originalNoButton') as any).style.display = 'none';
                        const noButton = document.getElementById('noButton') as any;
                        noButton.style.top = h + 'px';
                        noButton.style.left = w + 'px';
                        noButton.style.display = 'block';
                      }}>No</p>
                    </div>
                  </div>
                </div>
            }
          </div >
          : <div style="width: 100vw; max-width:100vw; height: 100vh; max-height: 100vh; position: absolute; display:flex; justify-content:center; align-items: center">
            <div style="font-size: 3rem">


              <p>
                Así me gusta 😜
              </p>
            </div>
          </div>
      }
    </>
  )
}
