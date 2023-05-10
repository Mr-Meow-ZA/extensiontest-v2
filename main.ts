//% color=#0fbc11 icon="\uf1b9" block="Encoder Extension"

namespace encoderExtension {
    let count = 0;
    let edge_state_P1 = 0;
    let edge_state_P2 = 0;

    function processCounts(): void {
        if (edge_state_P1 == 1 && edge_state_P2 == 1) {
            // Both encoder pins are high, no counting action needed
        } else if (edge_state_P1 == 1 && edge_state_P2 == 0) {
            // Forward motion: Pin 1 goes high before Pin 2 goes low
            count += 1;
        } else if (edge_state_P1 == 0 && edge_state_P2 == 1) {
            // Backward motion: Pin 2 goes high before Pin 1 goes low
            count -= 1;
        }
    }

    /**
     * Attach interrupt handlers to monitor encoder pin changes
     */
    //% blockId=encoder_attach_interrupts block="attach interrupts to Encoder Signals"
    //% blockGap=8
    export function attachInterrupts(): void {
        pins.setEvents(DigitalPin.P1, PinEventType.Edge);
        pins.setEvents(DigitalPin.P2, PinEventType.Edge);
        control.onEvent(DigitalPin.P1, EventBusValue.MICROBIT_PIN_EVT_RISE, () => {
            edge_state_P1 = pins.digitalReadPin(DigitalPin.P1);
            processCounts();
        });
        control.onEvent(DigitalPin.P2, EventBusValue.MICROBIT_PIN_EVT_RISE, () => {
            edge_state_P2 = pins.digitalReadPin(DigitalPin.P2);
            processCounts();
        });
        control.onEvent(DigitalPin.P1, EventBusValue.MICROBIT_PIN_EVT_FALL, () => {
            edge_state_P1 = pins.digitalReadPin(DigitalPin.P1);
            processCounts();
        });
        control.onEvent(DigitalPin.P2, EventBusValue.MICROBIT_PIN_EVT_FALL, () => {
            edge_state_P2 = pins.digitalReadPin(DigitalPin.P2);
            processCounts();
        });
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
