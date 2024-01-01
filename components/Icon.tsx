import React from "react"

const svg = {
  search: `<path d="M18.0586 19L11.3348 12.2765C10.8002 12.7368 10.1834 13.0919 9.51685 13.3231C8.83239 13.5664 8.11121 13.6903 7.38479 13.6894C6.54464 13.7058 5.70997 13.5507 4.93178 13.2337C4.15358 12.9166 3.44821 12.4442 2.85876 11.8454C2.25771 11.265 1.78261 10.5671 1.46303 9.79508C1.14344 9.0231 0.986236 8.19359 1.00119 7.35821C0.984628 6.51874 1.141 5.68484 1.46057 4.90839C1.78014 4.13195 2.25607 3.42956 2.85876 2.84495C3.44409 2.24785 4.14502 1.77638 4.91873 1.45932C5.69243 1.14227 6.52266 0.986299 7.35869 1.00094C8.19471 0.986299 9.02494 1.14227 9.79865 1.45932C10.5724 1.77638 11.2733 2.24785 11.8586 2.84495C12.4613 3.42956 12.9372 4.13195 13.2568 4.90839C13.5764 5.68484 13.7327 6.51874 13.7162 7.35821C13.7127 8.81059 13.2036 10.2164 12.2762 11.3342L19 18.0317L18.0586 19ZM7.35869 12.3808C8.01986 12.3865 8.67555 12.2604 9.28749 12.01C9.89943 11.7596 10.4554 11.3898 10.9229 10.9223C11.3905 10.4548 11.7602 9.89886 12.0107 9.28694C12.2611 8.67502 12.3871 8.01936 12.3815 7.35821C12.3956 6.69368 12.2743 6.03324 12.0249 5.41714C11.7754 4.80103 11.4032 4.24216 10.9307 3.7746C10.4682 3.298 9.91233 2.92191 9.29788 2.66982C8.68343 2.41773 8.02359 2.29506 7.35959 2.30947C6.69589 2.2983 6.03688 2.42244 5.42274 2.67434C4.80861 2.92624 4.25223 3.3006 3.78755 3.7746C3.30801 4.23823 2.9292 4.79575 2.67479 5.41233C2.42037 6.02892 2.29581 6.69133 2.30887 7.35821C2.29744 8.02105 2.42277 8.67912 2.67703 9.29137C2.93129 9.90361 3.30902 10.4569 3.78665 10.9166C4.25144 11.3904 4.80785 11.7646 5.42198 12.0163C6.0361 12.2681 6.69506 12.3921 7.35869 12.3808Z" fill="#FF1E00"/>`,
  heartOn: `<path d="M10.0028 18L9.15044 17.2312C7.54053 15.7876 6.21041 14.5455 5.16009 13.5051C4.26391 12.6378 3.42831 11.712 2.659 10.734C2.12345 10.0653 1.68872 9.3241 1.3682 8.53335C1.12932 7.90368 1.00515 7.23753 1.00137 6.56546C0.986301 5.96362 1.09539 5.36501 1.32206 4.80578C1.54872 4.24655 1.88827 3.7383 2.32019 3.3117C2.75211 2.88511 3.26744 2.54903 3.83509 2.32374C4.40273 2.09845 5.0109 1.98864 5.62289 2.00093C6.47385 1.9966 7.31086 2.21351 8.04915 2.62969C8.8326 3.08038 9.50044 3.7019 10.0012 4.44639C10.522 3.6954 11.2053 3.06707 12.0021 2.60649C12.7282 2.20497 13.5481 1.99627 14.3812 2.00093C14.9928 1.98919 15.6006 2.09941 16.1677 2.32494C16.7349 2.55047 17.2497 2.88664 17.6812 3.31317C18.1127 3.73971 18.4519 4.24778 18.6783 4.80674C18.9047 5.36569 19.0137 5.96396 18.9986 6.56546C18.9949 7.23753 18.8707 7.90368 18.6318 8.53335C18.3113 9.3241 17.8765 10.0653 17.341 10.734C16.5727 11.7119 15.7382 12.6377 14.8432 13.5051C13.7934 14.5455 12.4633 15.7876 10.8528 17.2312L10.0028 18Z" fill="#00BE1C"/>`,
  heartOff: `<path d="M10.4108 4.73025C10.8883 4.04156 11.5151 3.46447 12.2469 3.04072C12.8968 2.68227 13.6308 2.4957 14.3771 2.49987L14.3771 2.50003L14.3894 2.49979C14.9348 2.48932 15.4764 2.5876 15.9816 2.7885C16.4869 2.9894 16.9449 3.28863 17.3284 3.66771C17.7118 4.04678 18.0128 4.49782 18.2136 4.99341C18.4143 5.48897 18.5108 6.0191 18.4975 6.55191L18.4974 6.5519L18.4973 6.56161C18.4939 7.17205 18.3814 7.77728 18.165 8.34976C17.8629 9.09345 17.4536 9.79083 16.9494 10.4204L16.9494 10.4204L16.9465 10.4241C16.1922 11.3842 15.3728 12.2933 14.4939 13.1449L14.4939 13.1449L14.4899 13.1489C13.448 14.1815 12.1245 15.4175 10.5177 16.8579L10.5161 16.8594L10.001 17.3252L9.48399 16.8589L9.48293 16.8579C7.87665 15.4175 6.55309 14.1815 5.51065 13.1488L5.51068 13.1488L5.50647 13.1447C4.62647 12.2931 3.806 11.3841 3.05067 10.4238L3.05068 10.4238L3.04796 10.4204C2.54375 9.79082 2.13443 9.09343 1.83239 8.34974C1.61592 7.77726 1.50347 7.17204 1.50004 6.56161L1.50014 6.56161L1.49989 6.5519C1.48654 6.01879 1.58316 5.48836 1.78412 4.99255C1.98509 4.49672 2.28637 4.04551 2.67022 3.66639C3.05409 3.28726 3.51257 2.98811 4.01821 2.78743C4.52386 2.58674 5.06591 2.48882 5.61153 2.49978L5.61153 2.49994L5.62411 2.49987C6.38782 2.49599 7.13857 2.6905 7.80039 3.06313C8.51728 3.47591 9.12763 4.04442 9.58502 4.72441L9.99362 5.33185L10.4108 4.73025Z" stroke="#00BE1C" fill="none"/>`,
  close: `<path d="M3.0951 17.9999L2 16.9048L8.93102 10.0005L2 3.0961L3.0951 2.001L9.99947 8.93202L16.9038 2.001L17.9989 3.0961L11.0679 10.0005L17.9989 16.9048L16.9049 17.9999L10.0005 11.0689L3.0951 17.9999Z" fill="#000000"/>`,
  closeRed: `<path d="M3.0951 17.9989L2 16.9038L8.93102 9.99947L2 3.0951L3.0951 2L9.99947 8.93102L16.9038 2L17.9989 3.0951L11.0679 9.99947L17.9989 16.9038L16.9049 17.9989L10.0005 11.0679L3.0951 17.9989Z" fill="#FF0000"/>`,
  filterOff: `<path d="M11.6658 11.435V19H8.30649V11.435L1 2H19L11.6658 11.435ZM9.98614 11.52L16.3965 3.275H3.57575L9.98614 11.52Z" fill="#FFEB00"/>`,
  filterOn: `<path d="M11.6658 11.435V19H8.30649V11.435L1 2H19L11.6658 11.435Z" fill="#FFEB00"/>`,
  share: `<path d="M14.7863 17.9995C14.1998 17.9976 13.6378 17.757 13.2231 17.3302C12.8084 16.9034 12.5746 16.325 12.5728 15.7214C12.5741 15.6108 12.5837 15.5004 12.6015 15.3913C12.6193 15.2721 12.6487 15.1551 12.6893 15.042L6.80608 11.5249C6.6054 11.7566 6.36096 11.9437 6.08767 12.0749C5.81549 12.2116 5.51679 12.2832 5.21392 12.2843C4.62744 12.2824 4.0655 12.0418 3.65079 11.615C3.23608 11.1881 3.00228 10.6098 3.00044 10.0062C2.99448 9.70477 3.04923 9.40534 3.16125 9.12677C3.27326 8.84819 3.44011 8.5965 3.65128 8.38755C3.9625 8.0699 4.35848 7.85469 4.78887 7.76929C5.21925 7.68389 5.66459 7.73216 6.06825 7.90795C6.3443 8.03082 6.5948 8.20721 6.80608 8.42752L12.6893 4.95042C12.648 4.84779 12.6188 4.74045 12.6023 4.63068C12.5834 4.51847 12.5735 4.40485 12.5728 4.29097C12.5667 3.9896 12.6214 3.6902 12.7332 3.41163C12.8451 3.13305 13.0118 2.88133 13.2228 2.67232C13.5321 2.35149 13.9272 2.1328 14.3577 2.04416C14.7883 1.95552 15.2347 2.00096 15.6401 2.17468C16.0454 2.3484 16.3913 2.6425 16.6335 3.01945C16.8756 3.3964 17.0032 3.83908 16.9997 4.29097C17.0042 4.58982 16.9497 4.88651 16.8396 5.16308C16.7295 5.43964 16.566 5.69035 16.359 5.90002C16.156 6.11736 15.9114 6.28908 15.6408 6.40436C15.3701 6.51965 15.0791 6.576 14.7863 6.56987C14.4922 6.57056 14.2002 6.52002 13.9226 6.42039C13.6487 6.32336 13.4042 6.15415 13.2135 5.9296L7.33032 9.2868C7.35892 9.40864 7.38147 9.53189 7.39789 9.65609C7.41552 9.77196 7.42538 9.88894 7.4274 10.0062C7.42657 10.1068 7.41669 10.2072 7.39789 10.306C7.37822 10.4125 7.35569 10.5191 7.33032 10.6257L13.2135 14.0628C13.4127 13.8732 13.6427 13.7211 13.8931 13.6136C14.1767 13.4957 14.4805 13.438 14.7863 13.4441C15.2234 13.445 15.6504 13.5788 16.0139 13.8287C16.3773 14.0786 16.6609 14.4335 16.8289 14.8488C16.997 15.2641 17.042 15.7212 16.9584 16.1627C16.8748 16.6043 16.6663 17.0106 16.359 17.3305C16.1559 17.5477 15.9113 17.7193 15.6407 17.8344C15.37 17.9495 15.0791 18.0058 14.7863 17.9995Z" fill="#0000FF"/>`,
  viewList: `
    <path d="M19 6.625H1V5.275H19V6.625Z" fill="#AAAAAA"/>
    <path d="M19 10.675H1V9.325H19V10.675Z" fill="#AAAAAA"/>
    <path d="M19 14.725H1V13.375H19V14.725Z" fill="#AAAAAA"/>
    <path d="M2.35 2.35V17.65H17.65V2.35H2.35ZM1 1H19V19H1V1Z" fill="#AAAAAA"/>
  `,
  viewImage: `
    <path d="M19 14.725H1V13.375H19V14.725Z" fill="#AAAAAA"/>
    <path d="M2.35 2.35V17.65H17.65V2.35H2.35ZM1 1H19V19H1V1Z" fill="#AAAAAA"/>
  `,
  download: ` <path d="M2.89023 19C2.38935 18.9986 1.9094 18.8013 1.55523 18.4512C1.20105 18.1011 1.00144 17.6267 1 17.1316V13.6324H2.49962V17.1316C2.50489 17.2323 2.54773 17.3275 2.61988 17.3988C2.69202 17.4701 2.78834 17.5125 2.89023 17.5177H17.1098C17.2117 17.5125 17.308 17.4701 17.3801 17.3988C17.4523 17.3275 17.4951 17.2323 17.5004 17.1316V13.6324H19V17.1316C18.9986 17.6267 18.7989 18.1011 18.4448 18.4512C18.0906 18.8013 17.6106 18.9986 17.1098 19H2.89023ZM10.0005 14.4928L4.99262 9.5428L6.04244 8.4754L9.25019 11.6128V1H10.7507V11.6128L13.9603 8.4691L15.0101 9.5428L10.0005 14.4928Z" fill="#00BE1E"/> `,
  toilet: ` <path d="M4.10523 18.9964V12.2514H3V7.12598C3.01766 6.24056 3.71681 5.5243 4.58898 5.50631H6.88418C7.75283 5.5243 8.45551 6.23696 8.47316 7.12598V12.2514H7.37147V18.9964H4.10523ZM5.73658 4.28975C4.85028 4.28615 4.12994 3.5519 4.12641 2.64848C4.12288 1.74146 4.83969 1.00361 5.72952 1.00001C6.61935 0.996414 7.34322 1.73067 7.34675 2.63409C7.34675 3.0732 7.17726 3.49431 6.87006 3.80385C6.57345 4.11699 6.16031 4.28975 5.73305 4.28255L5.73658 4.28975ZM13.3249 19V13.6047H11.0297L12.9258 6.61129C13.0141 6.27295 13.226 5.98141 13.5155 5.79065C14.1335 5.41633 14.9032 5.41633 15.5212 5.79065C15.8107 5.97781 16.0191 6.27295 16.1109 6.61129L18 13.6047H15.7048V19H13.3213H13.3249ZM14.5184 4.29335C13.6321 4.28975 12.9117 3.5555 12.9082 2.65208C12.9011 1.74146 13.6215 1.00001 14.5113 1.00001C15.4011 1.00001 16.125 1.73067 16.1285 2.63409C16.1285 3.0732 15.959 3.49431 15.6518 3.80385C15.3552 4.11699 14.9421 4.28975 14.5148 4.28255L14.5184 4.29335Z" fill="black"/> `,
  wheelchair: ` <path d="M17.4996 19L12.487 13.8546H10.7765C10.2309 13.8546 9.77963 13.6709 9.41934 13.3001C9.05905 12.9292 8.87716 12.4683 8.87716 11.9102V10.1494L1.5 2.53031L2.5214 1.4969L18.5 17.945L17.4961 18.9964L17.4996 19ZM8.6358 18.3267C7.46749 18.3267 6.48807 17.9198 5.69753 17.106C4.907 16.2923 4.51173 15.2841 4.51173 14.085C4.51173 13.0516 4.86502 12.137 5.56811 11.3377C6.27469 10.5383 7.15967 10.0702 8.22654 9.93699V11.5969C7.56193 11.6725 7.03374 11.9678 6.64547 12.4827C6.2572 12.9976 6.06132 13.5305 6.06132 14.0814C6.06132 14.834 6.30617 15.4677 6.79588 15.9754C7.2856 16.4867 7.89774 16.7423 8.6323 16.7423C9.23395 16.7423 9.77263 16.5371 10.2484 16.1266C10.7241 15.7161 10.9899 15.1868 11.0494 14.5351H12.6654C12.536 15.6621 12.0708 16.5767 11.2698 17.2789C10.4687 17.9774 9.59074 18.3303 8.6323 18.3303L8.6358 18.3267ZM10.4687 4.36307C10.007 4.36307 9.61872 4.19744 9.30741 3.86977C8.99609 3.53851 8.83868 3.14243 8.83868 2.68154C8.83868 2.22785 8.99609 1.83177 9.30741 1.5005C9.62222 1.16563 10.0105 1 10.4722 1C10.934 1 11.2977 1.16563 11.623 1.5005C11.9484 1.83537 12.1093 2.22785 12.1093 2.68154C12.1093 3.13523 11.9484 3.54211 11.623 3.86977C11.2977 4.20104 10.913 4.36307 10.4687 4.36307ZM16.2648 10.1278C15.6352 10.1278 14.9636 9.9766 14.25 9.67053C13.5364 9.36447 12.8718 8.97199 12.2597 8.4859V9.82176L9.00309 6.4803C9.09054 6.17423 9.26543 5.92579 9.53128 5.73855C9.79712 5.55131 10.0979 5.45769 10.4372 5.45769C10.773 5.45769 11.0284 5.5045 11.2033 5.60172C11.3817 5.69894 11.5916 5.87538 11.8329 6.13463L12.3506 6.64953C12.8298 7.18604 13.4385 7.65053 14.173 8.04301C14.9076 8.43909 15.6072 8.64433 16.2683 8.66233V10.1314L16.2648 10.1278Z" fill="black"/> `,
  food: `
    <path d="M8.32883 8.36721C8.73424 8.83185 9.12542 9.28568 9.52015 9.74311C9.86155 10.1393 10.1994 10.5391 10.5408 10.9353C11.2769 11.7962 12.0202 12.657 12.7598 13.5178C13.311 14.159 13.8587 14.7965 14.4064 15.4376C14.826 15.9275 15.2527 16.4101 15.6617 16.9072C15.9782 17.2926 16.0102 17.732 15.8253 18.193C15.6475 18.6468 15.0785 19.0863 14.4846 18.9854C14.2072 18.9386 13.9832 18.7945 13.8054 18.5604C13.3537 17.9661 12.895 17.379 12.4398 16.7883C12.0024 16.2156 11.5614 15.6357 11.124 15.0594C10.6581 14.4471 10.1923 13.8348 9.72285 13.2261C9.31389 12.6966 8.90138 12.1671 8.49953 11.6377C8.055 11.0578 7.61759 10.4779 7.17663 9.89439C7.11261 9.81154 7.05216 9.73591 6.9917 9.65306C6.93836 9.58103 6.88146 9.56302 6.80323 9.61344C6.4156 9.86197 5.99242 9.97363 5.53722 9.9124C5.19939 9.86557 4.88644 9.73591 4.59839 9.54861C4.07919 9.20644 3.68089 8.749 3.31105 8.25555C2.89142 7.69727 2.46112 7.14258 2.03438 6.5843C1.68943 6.13407 1.34448 5.68384 0.999531 5.23361C0.87862 5.07513 0.747042 4.92745 0.640356 4.75817C0.551451 4.6177 0.473215 4.45922 0.508777 4.27912C0.576345 3.94415 0.892845 3.60198 1.30181 3.68122C1.4974 3.72084 1.61475 3.89013 1.73211 4.0378C2.06283 4.44841 2.39 4.86262 2.71717 5.27323C3.04789 5.68744 3.37862 6.10526 3.70934 6.51947C3.79825 6.63112 3.89071 6.74998 4.00095 6.84363C4.19299 7.00932 4.40991 6.99491 4.58417 6.82202C4.73708 6.67074 4.76553 6.41141 4.62328 6.23132C4.36368 5.89275 4.08986 5.56138 3.81959 5.22641C3.29683 4.57087 2.77407 3.91534 2.25486 3.2562C2.02016 2.95725 2.1304 2.58986 2.47179 2.41337C2.7954 2.24409 3.01233 2.38816 3.20792 2.63309C3.66311 3.20578 4.12542 3.77487 4.58417 4.34756C4.86155 4.68973 5.14249 5.03191 5.4092 5.38489C5.60835 5.64782 5.93907 5.67303 6.16311 5.48574C6.39782 5.28764 6.42983 4.96347 6.23068 4.71134C5.75415 4.10984 5.27051 3.51554 4.79398 2.92123C4.54149 2.60787 4.28545 2.29811 4.04007 1.98475C3.85515 1.75064 3.88004 1.45529 4.0863 1.23917C4.23922 1.08069 4.41703 0.987046 4.64462 1.00145C4.77264 1.00506 4.87222 1.06269 4.9469 1.15633C5.43765 1.75424 5.9284 2.35214 6.41916 2.95005C6.98459 3.638 7.55358 4.31514 8.1119 5.0067C8.41062 5.37408 8.65956 5.78469 8.78047 6.24933C8.86226 6.57349 8.93694 6.91207 8.8267 7.25424C8.78758 7.38031 8.76268 7.51718 8.74135 7.64684C8.69867 7.87376 8.55643 8.03944 8.4284 8.21593C8.39284 8.26276 8.35728 8.31318 8.31105 8.37441" fill="black"/>
    <path d="M16.8032 1.40846C17.3046 1.37965 17.7456 1.50571 18.151 1.75424C18.5422 1.99916 18.8551 2.33413 19.0827 2.74114C19.2677 3.07251 19.3779 3.42909 19.4455 3.80728C19.4917 4.07022 19.513 4.33315 19.4917 4.59609C19.4739 4.85182 19.4206 5.11115 19.3637 5.36328C19.3174 5.57218 19.2534 5.77749 19.1788 5.97919C19.097 6.20971 19.0187 6.44023 18.9014 6.64913C18.7093 6.99851 18.5066 7.33708 18.2826 7.66485C17.9341 8.17271 17.5038 8.60853 17.0237 8.99033C16.6325 9.30008 16.2058 9.54861 15.7435 9.7251C15.2741 9.90159 14.7798 9.97003 14.2819 9.90159C14.065 9.87278 13.8587 9.78993 13.6489 9.7143C13.5671 9.68548 13.5244 9.68908 13.4746 9.75392C13.215 10.0961 12.9483 10.4311 12.6852 10.7696C12.55 10.9425 12.4078 11.1118 12.2798 11.2883C12.2122 11.3819 12.1588 11.3639 12.0984 11.2955C11.9064 11.0758 11.7179 10.8525 11.5258 10.6328C11.2911 10.3626 11.06 10.0925 10.8253 9.82595C10.7115 9.69268 10.7115 9.68908 10.8217 9.55581C11.1453 9.15601 11.4689 8.75621 11.789 8.3528C11.8174 8.32038 11.8317 8.25555 11.821 8.21233C11.757 7.9494 11.6645 7.69006 11.629 7.42353C11.5827 7.06695 11.5721 6.69956 11.661 6.33937C11.7321 6.05483 11.7748 5.76308 11.8708 5.48934C11.981 5.18319 12.1233 4.88063 12.2798 4.59609C12.614 3.98377 13.0479 3.4435 13.5493 2.96085C13.9654 2.56105 14.4241 2.21527 14.9291 1.94513C15.2243 1.79386 15.5408 1.6858 15.8537 1.57054C16.1631 1.45529 16.4903 1.39405 16.7997 1.41566" fill="black"/>
    <path d="M8.20081 12.7795C8.30038 12.8983 8.39284 12.9992 8.47819 13.1036C8.84803 13.5827 9.21788 14.0653 9.59128 14.548C9.65173 14.6272 9.65173 14.6812 9.58772 14.7605C9.30678 15.117 9.0294 15.4772 8.75557 15.8374C8.26838 16.4641 7.78829 17.0945 7.29398 17.7176C7.05572 18.0165 6.81389 18.3155 6.54362 18.5892C6.34448 18.7909 6.07065 18.8522 5.78616 18.8449C5.3203 18.8341 4.96823 18.6216 4.74419 18.211C4.59483 17.9301 4.57705 17.6347 4.66951 17.325C4.79398 16.8928 5.10693 16.5938 5.37364 16.2588C5.7257 15.8158 6.08488 15.3728 6.44405 14.9334C6.89213 14.3859 7.34021 13.842 7.78473 13.2981C7.91631 13.136 8.05145 12.9704 8.20792 12.7795" fill="black"/>
  `,
}

interface Props {
  name?: keyof typeof svg
  className?: string
}

export default function Icon(p: Props) {
  return (
    <svg
      viewBox="0 0 20 20"
      dangerouslySetInnerHTML={{ __html: svg[p.name ?? ""] }}
      className={`pointer-events-none aspect-1/1 base:w-6 ${p.className}`}
    ></svg>
  )
}
