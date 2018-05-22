var bmpW=1.5*800, bmpH=480;
var txtSize = 32;

//Init background variables.
var backGroundX = 0;
var backGroundShift = 0.002;

//app.SetScreenMode( "Game" );
app.SetOrientation( "Portrait" );
app.SetDebugEnabled( false );

function OnBack()
{
 
}

function OnStart()
{
  var myTxt = "Are you developing a hacking tool for Android?\n\nAdd it to the pwnDroid collection. We encourage users to donate to their fav tools";
  app.Alert( myTxt, "Developers!" );
    app.EnableBackKey( false );
    
   //<<START SPLASH SCREEN CODE>>
   
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "FillXY", "Top" );	
	lay.SetBackColor( "#424242" );
	lay.SetPadding( 0, 0.15 );
  
  //Create some text.
  app.CreateText( "" );
    txt = app.CreateText( "pwnDroid", null, null, "Top" );
    txt.SetMargins( 0, 0, 0, 0 );    
    txt.SetTextSize( 80 );
    txt.SetFontFile( "font/logo.ttf" );
    txt.SetTextColor( "#ffffff" );
    txt.SetOnTouch( endSplash );
    lay.AddChild( txt );
    
       //Create a text with formatting.
    
    txt2 = app.CreateText( "The Android Hacking Collection", 1, null );
    txt2.SetMargins( 0, 0, 0, 0 );
    txt2.SetTextSize( 20 );
    txt2.SetFontFile( "font/font2.ttf" );
    txt2.SetTextColor( "#ffffff" );
    txt2.SetOnTouch( endSplash );
    lay.AddChild( txt2 );
    
   layB = app.CreateLayout( "Linear", "FillXY", "Bottom" );	
	layB.SetBackColor( "#424242" );
	layB.SetPadding( 0, 0, 0, 0.01 );
	lay.AddChild( layB );
	
     //Create some text.
    txt = app.CreateText( "Touch the screen anywhere to continue...", 1, null );
    txt.SetTextSize( 15 );
    txt.SetPosition( 0, 0.93 );
    txt.SetFontFile( "font/font3.ttf" );
    txt.SetTextColor( "#ffffff" );
    txt.SetOnTouch( endSplash );
    layB.AddChild( txt );
  
	
	//Add layout to app.	
	app.AddLayout( lay );
	lay.SetOnTouch( endSplash );
	layB.SetOnTouch( endSplash );
		
}



function endSplash()
{
	Home();
	lay.SetVisibility( "Gone" );
}

// << END SPLASH SCREEN >>


// << START MAIN SCREEN >>

//Called when application is started.
function Home()
{
//Create the main layout.
    layMain = app.CreateLayout( "Absolute", "FillXY" );    
    layMain.SetBackColor( "#ffffff" );
    
       //Create an blank image to act as our drawing canvas.
    //(For performance reasons, we limit the internal bitmap to 
   canvas = app.CreateImage( null, 1, 0.35, "fix", bmpW, bmpH );
   canvas.SetAlpha( 0.4 );
    canvas.SetAutoUpdate( false );
    canvas.SetPosition( 0, 0.09 );
    canvas.SetTextSize( 14 );
    canvas.SetPaintColor( "#ff0000" );
   layMain.AddChild( canvas );
   
     //Create a background image in memory (not added to layout).
    imgBackground = app.CreateImage("Img/cloud.png");
    
      //Drawing the game frame 30x a second.
    //(Slow this down if you get black flashes)
    timer = setInterval( DrawFrame, 1000/30 );
    
  //Create some text.
    txt = app.CreateText( "pwnDroid", 1, null );
    txt.SetTextSize( 80 );
    txt.SetPosition( 0, 0.1 );
    txt.SetFontFile( "font/logo.ttf" );
    txt.SetTextColor( "#6d6d6d" );
    layMain.AddChild( txt );

    
    //Create footer txt
    txt3 = app.CreateText( "Backroom-Studio:  No Rights Reserved\n Licensed under WTFPL 2.0 ", 0.8, null, "multiline" );
    txt3.SetTextSize( 17 );
      txt3.SetPosition( 0.1, 0.93 );
      txt3.SetTextColor( "#6d6d6d" );
    txt3.SetFontFile( "font/font3.ttf" );
    layMain.AddChild( txt3 );
  
  	//Create a drawer containing a menu list.
	CreateDrawer();
	 
    //Add layout to app.    
    app.AddLayout( layMain );
  
      

  //Switch off debugging for max performance.
    app.SetDebugEnabled( false );
    
  addLeftBtn();
  addRightBtn();
    
    app.AddDrawer( drawerScroll, "Left", drawerWidth );
    

}

 function addLeftBtn( )
 {
 //Create my text button for top left side
	txtBtn = app.CreateLayout( "Linear", "FillXY, Top, Left, TouchThrough" );
	txt = app.CreateText( "[fa-bars]", 0.15, 0.1, "FontAwesome" );
	txt.SetMargins( 0, 0.01 );
	txt.SetOnTouch( leftOnTouch );
	txt.SetTextSize( txtSize );
	txt.SetTextColor( "#6d6d6d" );
  txtBtn.AddChild( txt );
  app.AddLayout( txtBtn );    
 
 }
 
  function addRightBtn( )
 {
  //Create my text button for top right side
	txtBtn = app.CreateLayout( "Linear", "FillXY, Top, Right, TouchThrough" );
	txt = app.CreateText( "[fa-info-circle]", 0.15, 0.1, "FontAwesome" );
	txt.SetMargins( 0, 0.01 );
	txt.SetOnTouch( rightOnTouch );
	txt.SetTextSize( txtSize );
	txt.SetTextColor( "#6d6d6d" );
  txtBtn.AddChild( txt );
  app.AddLayout( txtBtn );    
 
 }

function leftOnTouch( ev )
{
    if( ev.action=="Down" ) 
{
		this.SetTextSize( txtSize-4 );
		this.SetTextColor("#008800" );
		}
	else if( ev.action=="Up" ) 
{
	    this.SetTextSize( txtSize );
	    this.SetTextColor("#6d6d6d" );
	    app.OpenDrawer( "left" );
	    }
}


function rightOnTouch( ev )
{
    if( ev.action=="Down" ) 
{
		this.SetTextSize( txtSize-4 );
		this.SetTextColor("#008800" );
		}
	else if( ev.action=="Up" ) 
{
	    this.SetTextSize( txtSize );
	    this.SetTextColor("#6d6d6d" );
	    About();
	    }
}

function OnMenu()
{
	app.OpenDrawer( "left" );
}






//Create the drawer contents.
function CreateDrawer()
{
    //Create a layout for the drawer.
	//(Here we also put it inside a scroller to allow for long menus)
	drawerWidth = 0.7;
    drawerScroll = app.CreateScroller( drawerWidth, 1 );
	layDrawer = app.CreateLayout( "Linear", "FillXY" );
	layDrawer.SetBackColor( "White" );
	drawerScroll.AddChild( layDrawer );
	
	//Create layout for top of drawer.
	layDrawerTop = app.CreateLayout( "Absolute" );
	layDrawerTop.SetBackground( "Img/menu.jpg" );
	layDrawerTop.SetSize( drawerWidth, 0.23 );
	layDrawer.AddChild( layDrawerTop );
	
	//Add an icon to top layout.
	var img = app.CreateImage( "Img/user.png", 0.18 );
	img.SetPosition( drawerWidth*0.06, 0.03 );
	layDrawerTop.AddChild( img );
	
	//Add a bold line of text
	var txtUser = app.CreateText( "pwnDroid v0.1a", -1, -1, "Bold");
	txtUser.SetPosition( drawerWidth*0.07, 0.155 );
	txtUser.SetTextColor( "#ffffff" );
	txtUser.SetTextSize( 16 );
	layDrawerTop.AddChild( txtUser );
	
	//Add user email to top layout.
	txtEmail = app.CreateText("http://pwndroid.backroom-studio.ml", "Underlined");
	txtEmail.SetPosition( drawerWidth*0.07, 0.185 );
	txtEmail.SetTextColor( "#ffffff" );
	txtEmail.SetTextSize( 14 );
	txtEmail.SetOnTouch( txtEmail_OnTouch );
	layDrawerTop.AddChild( txtEmail );
	
	//Create menu layout.
	var layMenu = app.CreateLayout( "Linear" );
	layMenu.SetSize( drawerWidth, 0.77 );
	layDrawer.AddChild( layMenu );
	
    //Add a list to menu layout (with the menu style option).
    var listItems = "Home::[fa-home],Anonymity::[fa-user-secret],Brute Force::[fa-bomb],Cryptology::[fa-hashtag],DDOS::[fa-times-circle],Forensics::[fa-search],Networks::[fa-sitemap],Pentesting::[fa-laptop],RATS::[fa-braille],Scripting::[fa-code],Security::[fa-shield],Packet Sniffing::[fa-podcast],Websites::[fa-firefox],WiFi::[fa-wifi],About::[fa-info]";
    lstMenu1 = app.CreateList( listItems, -1, -1, "Menu" );
    lstMenu1.SetColumnWidths( -1, 0.35, 0.18 );
    lstMenu1.SelectItemByIndex( 0, true );
    lstMenu1.SetOnTouch( lstMenu_OnTouch );
    layMenu.AddChild( lstMenu1 );
    

}

//Open website if url is touched
function txtEmail_OnTouch()
{
app.OpenUrl( "http://pwndroid.backroom-studio.ml" );
}

//Handle menu item selection.
function lstMenu_OnTouch( title, body, type, index )
{
  
    lstMenu1.SelectItemByIndex(-1);
    this.SelectItemByIndex( index, true );

  switch (title) {
    case "About":
      app.CloseDrawer( "Left" );
      About();
      break;
   case "Home":
      app.CloseDrawer( "Left" );
     Home();
     break;
   case "Anonymity":
     app.CloseDrawer( "Left" );
     Anonymity();
     break;
   case "Brute Force":
     app.CloseDrawer( "Left" );
     Brute();
     break;
          
    default:
    app.Alert("Something went wrong with the switch ststment.");
    
        }
    }
    








//Update and redraw all game graphics.
function DrawFrame()
{
    //Clear the canvas.
    canvas.Clear();
    
    //Draw two copies of the background image side by side.
    canvas.DrawImage( imgBackground, backGroundX, 0, 1.0, 1.0 );
    canvas.DrawImage( imgBackground, 1.0 + backGroundX, 0, 1.0, 1.0 );
    
    //Shift the background images left slightly each frame
    //until the left image is off screen, then we start again.
    backGroundX -= backGroundShift;
    if( backGroundX <= -1 ) backGroundX = 0;
    
    //Update the canvas.
    canvas.Update();
}


// << START	ABOUT PAGE >>
function About()
{
		//Create a layout with objects vertically centered.
	layAb = app.CreateLayout( "linear", "VCenter,FillXY" );	
	layAb.SetBackColor( "#ffffff" );

    //Create some text.
    txt = app.CreateImage( "img/pwnDroid.png", 0.3, -1 );
    txt.SetMargins( 0.01, 0.01, 0.01, 0.07 );
    layAb.AddChild( txt );
    
  lst = app.CreateList( "Developed by:Backroom Studio:[fa-code], Version:0.1 alpha:[fa-key], Software License:Released under WTFPL 2.0 (as free as it gets):[fa-beer], Website:pwndroid.backroom-studio.ml:[fa-globe], Report Bugs:backroom-studio@gmx.com:[fa-bug]", 0.9, 0.5 );
  lst.SetDivider( 0.001, "#00d6d6d6" );
  lst.SetTextColor( "#008800" );
lst.SetTextSize( 12 );
lst.SetFontFile( "font/font3.ttf" );
lst.SetTextSize2( 16 );
lst.SetOnTouch( Alist );
lst.SetIconSize( 20 );
   lst.SetTextColor2( "#90363636" );
 

  layAb.AddChild( lst );
  
  	//Create a layout with objects vertically centered.
	layAb2 = app.CreateLayout( "linear", "Horizontal,VCenter" );	
	layAb2.SetSize( 1, 0.2 );
	layAb2.SetBackColor( "#ffffff" );
	layAb.AddChild( layAb2 );

//Create some text.

  
    txt = app.CreateImage( "Img/facebook.png", 0.1, -1, "Resize" );
    txt.SetMargins( 0.02, 0.04, 0.01, 0.01 );
 //   txt.SetOnTouchDown( facebook );
    layAb2.AddChild( txt );
    
    //Create some text.
    txt = app.CreateImage( "Img/mail.png", 0.1, -1, "Resize" );
    txt.SetMargins( 0.02, 0.04, 0.01, 0.01 );
    txt.SetOnTouchDown( );
    layAb2.AddChild( txt );
    
    //Create some text.
    txt = app.CreateImage( "Img/github.png", 0.1, -1, "Resize" );
    txt.SetMargins( 0.01, 0.04, 0.01, 0.01 );
//    txt.SetOnTouch( twitter );
    layAb2.AddChild( txt );
	
	//Add layout to app.	
	app.AddLayout( layAb );
	addLeftBtn();
}

function Alist(title, body)
{
	if ( title=="Website" ) {
     var yesNoWeb = app.CreateYesNoDialog( "Visit Website?" );
     yesNoWeb.SetOnTouch( yesNoWeb_OnTouch );

	 }
	if ( title=="Report Bugs" ) {
     var yesNoWtf = app.CreateYesNoDialog( "View Software License?" );
     yesNoWtf.SetOnTouch( yesNoWtf_OnTouch );
	 }	 
	if ( title=="Software License" ) {
  var yesNoMail = app.CreateYesNoDialog( "View Software License?" );
  yesNoMail.SetOnTouch( yesNoMail_OnTouch );
	 }
	 
 function yesNoWeb_OnTouch( result )
  {
  if( result=="Yes" ) app.OpenUrl( "http://pwndroid.backroom-studio.ml" ); 
  }

   function yesNoWtf_OnTouch( result )
  {
  if( result=="Yes" ) app.OpenUrl( "http://www.wtfpl.net/txt/copying/" );
  }

   function yesNoMail_OnTouch( result)
  {
    if( result=="Yes" ) app.SendMail( "backroom-studio@gmx.com", "pwnDroid", "Hey Dev...");   
  }	 
	 
}


  
// << END ABOUT PAGE >>

// << START THE	ANON PAGE >>
function Anonymity( )
{
		//Create a layout with objects vertically centered.
	layAnon= app.CreateLayout( "Absolute", "VCenter,FillXY" );	
	layAnon.SetBackColor( "#ffffff" );

	
  //Create some text.
    txt = app.CreateText( "pwnDroid", 1, null );
    txt.SetTextSize( 80 );
    txt.SetPosition( 0, 0.1 );
    txt.SetFontFile( "font/logo.ttf" );
    txt.SetTextColor( "#6d6d6d" );
    layAnon.AddChild( txt );

  lst = app.CreateList( "null",1, 1, "WhiteGrad" );
  lst.SetPosition(0, 0.25);
  lst.SetTextColor1( "#ff555558");
  lst.SetTextColor2( "#ff555558" );
  lst.SetTextMargins( 0.04, 0, 0, 0 ); 
  lst.SetOnTouch( lstAnon_OnTouch );
  
 lst.RemoveItem( "null" )
lst.AddItem("Anonymous Email", "Send mail that appears to come from any address.", "icons/anon_email.jpg"); 
lst.AddItem("Proxy Droid", "Advanced Proxy settings", "icons/proxydroid.png"); 
lst.AddItem("Or Bot", "Channel all of your traffic through TOR.", "icons/tor.png"); 
lst.AddItem("Mac Address Ghost", "Spoof your Mac Address.", "icons/ghost.png"); 
lst.AddItem("Spy Kit", "Your all-in-one email manipulation kit.", "icons/spy.png"); 



  	layAnon.AddChild( lst );

  
		//Add layout to app.	
	app.AddLayout( layAnon );

	addLeftBtn();
	addRightBtn();
	

    
}

function lstAnon_OnTouch(Title)
{
      switch (Title) {
    case "Anonymous Email":
      app.OpenUrl( "http://pwndroid.backroom-studio.ml/apks/anon/anonemail.apk" );
      break;
   case "Proxy Droid":
      app.OpenUrl( "http://pwndroid.backroom-studio.ml/apks/anon/ProxyDroid_v2.6.6.apk" );
      break;
   case "Or Bot":
      app.OpenUrl( "http://pwndroid.backroom-studio.ml/apks/anon/OrBot_[Tor].apk" );
      break;
   case "Mac Address Ghost":   
      app.OpenUrl( "http://pwndroid.backroom-studio.ml/apks/anon/Mac_Address_ghost_v1.10.apk" );
      break;      
   case "Spy Kit":   
      app.OpenUrl( "http://pwndroid.backroom-studio.ml/apks/anon/Spy_Kit_Universal_mailer_v1.2.apk" );
      break; 
      
    default:
    app.Alert("Something went wrong with the switch ststment.");
    }

}

// << END ANON PAGE >>

// << START BRUTE PAGE >>
function Brute( )
{
		//Create a layout with objects vertically centered.
	layBrute = app.CreateLayout( "Absolute", "VCenter,FillXY" );	
	layBrute.SetBackColor( "#ffffff" );

	
  //Create some text.
    txt = app.CreateText( "pwnDroid", 1, null );
    txt.SetTextSize( 80 );
    txt.SetPosition( 0, 0.1 );
    txt.SetFontFile( "font/logo.ttf" );
    txt.SetTextColor( "#6d6d6d" );
    layBrute.AddChild( txt );

  lst1 = app.CreateList( "null",1, 1, "WhiteGrad" );
  lst1.SetTextColor1( "#ff555558");
  lst1.SetTextColor2( "#ff555558" );
  lst1.SetTextMargins( 0.04, 0, 0, 0 ); 
  lst1.SetOnTouch( lstBrute_OnTouch );
  
 lst1.RemoveItem( "null" )
lst1.AddItem("Find My Router Pass", "A Brute Force Router utiility..", "icons/webkey.jpg"); 
lst1.AddItem("RouterPWN", "Another Brute Force Router utiility..", "icons/routerpwn.png"); 
lst1.AddItem("Router Brute", "Yet another Brute Force Router utiility..", "icons/routerbruteforce.png"); 



  	layBrute.AddChild( lst1 );

  
		//Add layout to app.	
	app.AddLayout( layBrute );

	addLeftBtn();
	addRightBtn();
	

    
}

function lstBrute_OnTouch(Title)
{
      switch (Title) {
    case "Find My Router Pass":
      app.OpenUrl( "http://pwndroid.backroom-studio.ml/apks/brute/Find_My_Routers_Password_v1.0.3.apk" );
      break;
   case "RouterPWN":
      app.OpenUrl( "http://pwndroid.backroom-studio.ml/apks/brute/Routerpwn_v1.4.144.apk" );
      break;
   case "Router Brute":
      app.OpenUrl( "http://pwndroid.backroom-studio.ml/apks/brute/Router_Brute_Force_v2.7.1.apk" );
      break;
 
      
    default:
    app.Alert("Something went wrong with the switch ststment.");
    }

}


// << END BRUTE PAGE >>
// <<