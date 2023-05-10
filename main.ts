//% color=#0fbc11 icon="\uf1b9" block="Encoder Extension"

namespace encoderExtension {
    let count = 0;
    let last_state_P1 = 0;
    let last_state_P2 = 0;

    function processCounts(): void {
        const current_state_P1 = pins.digitalReadPin(DigitalPin.P1);
        const current_state_P2 = pins.digitalReadPin(DigitalPin.P2);

        if (last_state_P1 != current_state_P1 || last_state_P2 != current_state_P2) {
            if (last_state_P1 == 0 && current_state_P1 == 1 && current_state_P2 == 0) {
                // Forward motion: Pin 1 goes high before Pin 2 goes low
                count += 1;
            } else if (last_state_P2 == 0 && current_state_P2 == 1 && current_state_P1 == 0) {
                // Backward motion: Pin 2 goes high before Pin 1 goes low
                count -= 1;
            }
        }

        last_state_P1 = current_state_P1;
        last_state_P2 = current_state_P2;
    }

    /**
     * Attach interrupt handlers to monitor encoder pin changes
     */
    //% blockId=encoder_attach_interrupts block="attach interrupts to Encoder Signals"
    //% blockGap=8
    export function attachInterrupts(): void {
        pins.setEvents(DigitalPin.P1, PinEventType.Edge);
        pins.setEvents(DigitalPin.P2, PinEventType.Edge);
        control.onEvent(DigitalPin.P1, EventBusValue.MICROBIT_PIN_EVT_RISE, processCounts);
        control.onEvent(DigitalPin.P2, EventBusValue.MICROBIT_PIN_EVT_RISE, processCounts);
        control.onEvent(DigitalPin.P1, EventBusValue.MICROBIT_PIN_EVT_FALL, processCounts);
        control.onEvent(DigitalPin.P2, EventBusValue.MICROBIT_PIN_EVT_FALL, processCounts);
    }

    /**
     * Get the current count value
     */
    //% blockId=encoder_get_count block="get Encoder Count"
    //% blockGap=8
    export function getCount(): number {
        return count;
    }
}
