import { getInput } from '../../main.js';

const input = getInput();

const bitTable = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111',
}

let bits = '';
input[0].split('').forEach(char => bits += bitTable[char]);

export function solveA() {
    let packet = parsePacket();
    removeNaN(packet);
    console.log(packet);
    return countVersion(packet);
}

export function solveB() {
    let packet = parsePacket();
    removeNaN(packet);
    console.log(packet.subPackets[0]);

    return 0;
}

const parsePacket = (parseRest = true) => {
    let packet = {
        version: parseInt(getBits(3), 2),
        type: parseInt(getBits(3), 2),
        length: 6,
        subPackets: [],
    }

    if (packet.type === 4) {
        parseLiteralValuePacket(packet, parseRest);
    } else {
        parseOperatorPacket(packet);
    }

    return packet;
}

const parseLiteralValuePacket = (packet, parseRest) => {
    let binaryValue = '';
    let length = 0;
    let done = false;
    while (!done) {
        length += 5;
        const x = getBits(5);
        binaryValue += x.substring(1);
        done = x.startsWith('0');
    }

    packet.value = parseInt(binaryValue, 2);
    packet.length += length;

    if (parseRest) {
        let step = 0;
        do {
            step += 4;
        } while (step < packet.length);

        const restLength = step - packet.length;
        packet.rest = getBits(restLength);
        packet.length += restLength;
    }

    return packet;
}

const parseOperatorPacket = (packet) => {
    packet.lengthTypeID = parseInt(getBits(1), 2);

    if (packet.lengthTypeID === 0) {
        const totalLength = parseInt(getBits(15), 2);

        let lengthToParse = totalLength;
        while (lengthToParse > 0) {
            const subPacket = parsePacket(false);
            packet.subPackets.push(subPacket);
            lengthToParse -= subPacket.length;
        }
        packet.length += totalLength;
    } else if (packet.lengthTypeID === 1) {
        const totalSubPackets = parseInt(getBits(11), 2);
        for (let i = 0; i < totalSubPackets; i++) {
            const subPacket = parsePacket(false);
            packet.subPackets.push(subPacket);
            packet.length += subPacket.length;
        }
    }

    return packet;
}

const getBits = (count, remove = true) => {
    const b = bits.slice(0, count);
    if (remove) {
        bits = bits.substring(count);
    }
    return b;
}

const countVersion = (packet) => {
    let count = packet.version;
    packet.subPackets.forEach(subPacket => count += countVersion(subPacket));
    return count;
}

const removeNaN = (packet) => {
    packet.subPackets = packet.subPackets.filter(packet => !isNaN(packet.version));
    packet.subPackets.forEach(packet => removeNaN(packet));
}
