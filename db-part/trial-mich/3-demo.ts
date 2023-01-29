//how to delete unnecessary \n, extract string from array by .join 

function wordsToReplace() {   //#119
    // let description = ["Erik Dalton, Ph.D. Myoskeletal Alignment Techniques for Low Back, Hip and Leg Pain. This respected multi-modality pain management system is designed to alleviate reflex muscle guarding caused by joint blockage. The myoskeletal method simplifies complex muscle/joint into an easy to follow hands-on format... a quality experience for the visual and kinesthetic bodyworker. Dalton's muscle energy and myofascial mobilization techniques offer the pain-management, sports therapist and structural integrator Certified Myoskeletal Therapist credentials that set them apart in the eyes of clients and referral sources.", "This impressive DVD collection takes you to the heart of many chronic pain conditions.A perfect addition to any sports medicine, structural integration, physical therapy, personal training or bodywork practice. --Darren Allen, PT, ATC, LMT, Los Angeles < br /> <br />Every new project Erik Dalton undertakes adds a layer of depth to his previous work. Even if you have his other DVDs, this latest, elaborately produced addition adds yet another layer of understanding coupled with many new strategies and tools to enhance the therapeutic effectiveness of any therapist. --Art Riggs, author of Deep Tissue Massage<br / > <br />Erik Dalton s videos always offer value for money for the working therapist. Well produced, clear, down-to-earth, and best of all the techniques are always placed in an integrated context so that, as he says, &#34;you don't get stuck chasing the pain .&#34; --Tom Myers, author of Anatomy Trains"]
    // let description = ['Filmed in 8 countries\nIncludes Vocabulary Presentation video with optinal pop-up vocabulary\nTelehistoria storyline video\ncomparacion cultural videos\nOptional Spanish and English subtitles']
    // let description = ['This DVD applies basic fundamental technique to real and pertinent game situations. A logical progression of exercises from 1v1 to 3v3 is followed by an overview of the basic principles of zonal defending (with exercises to teach all aspects of the zone system) and finally a coaching progression for orientated ball possession.\n\n    1v1 to 3v3 for a cross\n    1v1 to 3v3 at goal\n    Challenged heading\n    Basic principles of zonal defending\n    Games to improve ball possession skills']
    let description = ["Have failures in your life caused you to feel ashamed or condemned? Well, you don't have to remain this way! Jesus' finished work on the cross didn't just secure you a place in heaven. It also delivered you from darkness into light, and qualified you to enjoy God's goodness. Join Joseph Prince as he unfolds gems of truths about your right standing in Christ today through a visual study of the tabernacle and the story of David and Goliath. Internalize the revelations shared in this DVD album and begin to exercise your rights as a believer!\n\n3-DVD Album (3 sermonsapprox. total duration: 3hr 2min)\n\nDisc 1: Out of Cursing Into BlessingBecause Of The Cross (Approx.: 57min)\nDisc 2: The CrossYour Redemption From Shame And Reproach (Approx.: 1 hr 3min)\nDisc 3: Uncovering Your True Identity In ChristA Visual Study Of The Tabernacle's Golden Boards (Approx.: 1 hr 2min)"]

    for (let word of description) {
        word = word.replace('\n', ' ')
    }
    let newDescription = description.join()
    console.log(newDescription)


    // let category = ['Independently Distributed', 'Art House & International']
    // let category:any= [ ]
    // console.log(category.join())

    // let also_buy = ['B002I5GNW4', 'B005WXPVMM', 'B009UY3W8O', 'B00N27ID1G', 'B0017DHKHA', 'B000NR7ROM', 'B000AOEPMA', 'B003F1N9EK', 'B000UMP2VK', '060961066X', 'B000KL8ODE', '0804187045', 'B0023TGAF0', '0307238768', 'B003U2XYSK', '1419726692', '0307464881', 'B000WTVZHQ', 'B002I5GNVU', 'B000AOEPN4', 'B002TCRQ68', 'B000PDZIYK', 'B004JAUDL8', 'B001CD6EVI', 'B002HT0JAI', '000014357X', 'B014VVNTYC', 'B000Q1F008', 'B000PDZIWM', 'B002TLRG5A', 'B000TA37G0', 'B002I5GNX8', 'B01J4Z8666', 'B007IUED6W', 'B000H6SY00']
    // console.log(also_buy.join())


    // let imageURL:string[] =['https://images-na.ssl-images-amazon.com/images/I/51BM1I0lyFL._SX38_SY50_CR,0,0,38,50_.jpg']
    // console.log(imageURL.join())

    // let rank = '342,914 in Movies & TV ('
    // console.log (rank.replace(' in Movies & TV (', ''))

}
wordsToReplace()
