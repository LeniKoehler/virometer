// Exports ----------------------------------------------------------------------------------------

export { Bundesland, states }

// Konstanten -------------------------------------------------------------------------------------

/**
 * Diese Enum repräsentiert die Id der Bundesländer wie sie in Grafana zu finden sind.
 */

enum PanelId {
    BW = 2,
    TH,
    BY,
    BE,
    BB,
    HB,
    HH,
    HE,
    MV,
    NI,
    NW,
    RP,
    SL,
    SN,
    ST,
    SH,
}

/**
 * Destructure Bundesland to work with the Enum values itself e.G 'BW' instead of 'PanelId.BW'.
 */

const { BW, TH, BY, BE, BB, HB, HH, HE, MV, NI, NW, RP, SL, SN, ST, SH } = PanelId

/**
 * Typ Bundesland weiß welche ID zu welchem Bundesland gehört.
 */

type Bundesland = {
    panelId: PanelId
    name: string
    link?: string
}

/**
 * Alle Bundesländer mit ihrem dazugehörigen Code.
 */

const states: Array<Bundesland> = [
    { panelId: BW, name: "Baden-Württemberg", link: `/bundesland/${BW}` },
    { panelId: BY, name: "Bayern", link: `/bundesland/${BY}` },
    { panelId: BW, name: "Bremen", link: `/bundesland/${HB}` },
    { panelId: BW, name: "Brandenburg", link: `/bundesland/${BB}` },
    { panelId: BW, name: "Nordrhein-Westfalen", link: `/bundesland/${NW}` },
    { panelId: BW, name: "Berlin", link: `/bundesland/${BE}` },
    { panelId: BW, name: "Hamburg", link: `/bundesland/${HH}` },
    { panelId: BW, name: "Hessen", link: `/bundesland/${HE}` },
    { panelId: BW, name: "Mecklenburg-Vorpommern", link: `/bundesland/${MV}` },
    { panelId: BW, name: "Niedersachsen", link: `/bundesland/${NI}` },
    { panelId: BW, name: "Rheinland-Pfalz", link: `/bundesland/${RP}` },
    { panelId: BW, name: "Saarland", link: `/bundesland/${SL}` },
    { panelId: BW, name: "Sachsen", link: `/bundesland/${SN}` },
    { panelId: BW, name: "Sachsen-Anhalt", link: `/bundesland/${ST}` },
    { panelId: BW, name: "Schleswig-Holstein", link: `/bundesland/${SH}` },
    { panelId: BW, name: "Thüringen", link: `/bundesland/${TH}` }
]
