export const questions = [
  {
    key: 1,
    data: `<p>When do you go on this date?</p>
                <div class="calendar">
                
                </div>`,
  },
  {
    key: 2,
    data: `<p>How old is your date?</p>
                <div class="multi-choices grid">
                    <div class="choice age-input active">
                      <i class="check-mark fas fa-check active"></i>
                      <span>18 - 25</span>
                    </div>
                    <div class="choice age-input">
                      <i class="check-mark fas fa-check"></i>
                      <span>26 - 35</span>
                    </div>
                    <div class="choice age-input">
                      <i class="check-mark fas fa-check"></i>
                      <span>36 - 45</span>
                    </div>
                    <div class="choice age-input">
                      <i class="check-mark fas fa-check"></i>
                      <span>45 - 55</span>
                    </div>
                    <div class="choice age-input">
                      <i class="check-mark fas fa-check"></i>
                      <span>60 and above</span>
                    </div>
                  </div>`,
  },
  {
    key: 3,
    data: ` <p>Where would you like your date to take place?</p>
                  <div class="location-inputs">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      placeholder="Address"
                    />
                    <input
                      type="number"
                      name="range"
                      id="range"
                      placeholder="Range (KM)"
                      min="1"
                    />
                  </div>

                  <div id="map"></div>`,
  },
  {
    key: 4,
    data: ` <p>What time is the date?</p>
                  <div class="multi-choices">
                    <div class="choice time-input active">
                      <i class="check-mark fas fa-check active"></i>
                      <span>Morning</span>
                    </div>
                    <div class="choice time-input">
                      <i class="check-mark fas fa-check"></i>
                      <span>Afternoon</span>
                    </div>
                    <div class="choice time-input">
                      <i class="check-mark fas fa-check"></i>
                      <span>Evening</span>
                    </div>
                    <div class="choice time-input">
                      <i class="check-mark fas fa-check"></i>
                      <span>Night</span>
                    </div>
                  </div>`,
  },
  {
    key: 5,
    data: `<p>What is the occasion for your date?</p>
                  <input
                    type="text"
                    name="occasion"
                    id="occasion"
                    placeholder="Type here..."
                  />`,
  },
  {
    key: 6,
    data: `<p>What is your budget for the date?</p>
                  <div class="multi-choices">
                    <div class="choice budget active">
                      <i class="check-mark fas fa-check active"></i>
                      <span>Medium</span>
                    </div>
                    <div class="choice budget">
                      <i class="check-mark fas fa-check"></i>
                      <span>Low</span>
                    </div>
                    <div class="choice budget">
                      <i class="check-mark fas fa-check"></i>
                      <span>High</span>
                    </div>
                  </div>`,
  },
  {
    key: 7,
    data: `<p>
                    Do you prefer indoor or outdoor activities for this date?
                  </p>
                  <div class="multi-choices">
                    <div class="choice medium active">
                      <i class="check-mark fas fa-check active"></i>
                      <span>Indoor</span>
                    </div>
                    <div class="choice medium">
                      <i class="check-mark fas fa-check"></i>
                      <span>Outdoor</span>
                    </div>
                    <div class="choice medium">
                      <i class="check-mark fas fa-check"></i>
                      <span>Doesn't matter</span>
                    </div>
                  </div>`,
  },
  {
    key: 8,
    data: ` <p>
                    What are some interests or hobbies of the person you’re
                    going on a date with?
                  </p>
                  <input
                    type="text"
                    name="date_interest_or_hobbies"
                    id="hobbies"
                    placeholder="Type here and press enter"
                  />
                  <ul id="hobbies-list">
                    
                  </ul>`,
  },
  {
    key: 9,
    data: `  <p>
                    Is there anything else you’d like us to know about this
                    date? (Optional)
                  </p>
                  <textarea
                    name="additional"
                    id="additional"
                    placeholder="Please write any additional information here."
                  ></textarea>`,
  },
];
